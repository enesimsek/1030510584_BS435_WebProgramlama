import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { Sounds } from '../../../components/Sound Player/sound_player';
import { SettingsComp } from '../../../components/Settings/settings_comp';
import { ImageCard } from '../../../components/ImageCard/ImageCard';
import { getGameImages } from '../../../services/getImage_service';
import type { GameImage } from '../../../services/getImage_service';
import { saveScore } from '../../../services/leaderboard_service';
import { PATHS } from '../../../routes/paths';
import './easyGameScreen.css';

type easyGameScreenProps = { userName: string; };

export const EasyGameScreen = ({ userName }: easyGameScreenProps) => {
    const navigate = useNavigate();

    const [images, setImages] = useState<GameImage[]>([]);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [, setLoadedCount] = useState(0);

    // Yeni tur başlat
    const startNewRound = () => {
        // 2 gerçek görsel 1 ai görsel al ve karıştır
        const newImages = getGameImages(2, 1);
        setImages(newImages);
        setShowResult(false);
        setSelectedImageId(null);
        setImagesLoading(true);
        setLoadedCount(0);
    };

    // Görsel yüklendiğinde çağrılır
    const handleImageLoad = () => {
        setLoadedCount(prev => {
            const newCount = prev + 1;
            // 3 görsel yüklendiğinde (2 gerçek + 1 ai)tüm görselleri göster
            if (newCount === 3) {
                setImagesLoading(false);
            }
            return newCount;
        });
    };

    // Kart seçimi
    const handleCardSelect = (imageId: string, isCorrect: boolean) => {
        if (showResult || showSettings) return;

        setSelectedImageId(imageId);
        setShowResult(true);

        if (isCorrect) {
            // Doğru cevap
            setScore(score + 10);
            setTimeout(() => {
                startNewRound();
            }, 1500);
        } else {
            // Yanlış cevap
            const newLives = lives - 1;
            setLives(newLives);

            if (newLives <= 0) {
                // Skoru kaydet ve kaybetme sayfasına yönlendir
                const gameMode = 1; // Klasik Kolay
                saveScore(userName, score, gameMode);
                navigate(PATHS.LOSE_SCREEN.path, {
                    state: { userName, score, gameMode }
                });
            } else {
                setTimeout(() => {
                    startNewRound();
                }, 1500);
            }
        }
    };

    useEffect(() => {
        startNewRound();
    }, []);



    return (
        <div className="classic-easy-game-screen">
            {/* Ayarlar Komponenti */}
            {showSettings && (
                <div className="settings-overlay">
                    <SettingsComp
                        userName={userName}
                        callerPage="game"
                        onClose={() => setShowSettings(false)}
                    />
                </div>
            )}

            {/* Sol üst Geri butonu */}
            <button className="game-screen back-button" onClick={async () => {
                await Sounds.clickAsync();
                const gameMode = 1; // Klasik Kolay
                saveScore(userName, score, gameMode);
                navigate(PATHS.LOSE_SCREEN.path, {
                    state: {
                        userName,
                        score,
                        gameMode
                    }
                });
            }}>
                ✕ Pes Et
            </button>

            {/* Sağ üst Settings ikonu */}
            <div className="settings-icon" onClick={async () => {
                await Sounds.clickAsync();
                setShowSettings(true);
            }}>
                <IoSettingsOutline />
            </div>

            {/* Header */}
            <div className="game-header">
                <h1>Yapay Görsel Bulma Oyunu</h1>
                <div className="game-stats">
                    <span>Oyuncu: {userName}</span>
                    <span>Can: {'❤️'.repeat(lives)}</span>
                    <span>Skor: {score}</span>
                </div>
            </div>

            {/* Görseller Grid */}
            <div className="images-grid">
                {images.map((image) => (
                    <ImageCard
                        key={image.id}
                        imageUrl={image.url}
                        isAI={image.isAI}
                        onSelect={(isCorrect) => handleCardSelect(image.id, isCorrect)}
                        showResult={showResult}
                        isSelected={selectedImageId === image.id}
                        isLoading={imagesLoading}
                        onImageLoad={handleImageLoad}
                    />
                ))}
            </div>
        </div>
    );
}
