import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { Sounds } from '../../components/Sound Player/sound_player';
import { SettingsComp } from '../../components/Settings/settings_comp';
import { ImageCard } from '../../components/ImageCard/ImageCard';
import { getGameImages } from '../../services/getImage_service';
import type { GameImage } from '../../services/getImage_service';
import { saveScore } from '../../services/leaderboard_service';
import { PATHS } from '../../routes/paths';
import './classicEasyGameScreen.css';

type ClassicEasyGameScreenProps = { userName: string; };

export const ClassicEasyGameScreen = ({ userName }: ClassicEasyGameScreenProps) => {
    const navigate = useNavigate();

    const [images, setImages] = useState<GameImage[]>([]);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);

    // Yeni tur başlat
    const startNewRound = () => {
        // 5 gerçek görsel + 1 AI görsel al ve karıştır
        const newImages = getGameImages(5, 1);
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
            // 6 görsel yüklendiğinde (5 gerçek + 1 AI), tüm görselleri göster
            if (newCount === 6) {
                console.log('Tüm görseller yüklendi! Shimmer kapatılıyor...');
                setImagesLoading(false);
            }
            return newCount;
        });
    };

    // Kart seçimi
    const handleCardSelect = (imageId: string, isCorrect: boolean) => {
        if (showResult || gameOver || showSettings) return;

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
                setTimeout(() => {
                    setGameOver(true);
                }, 1500);
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

    // Oyun bitti ekranı
    if (gameOver) {
        // Skoru kaydet ve lose screen'e yönlendir
        const gameMode = 1; // Klasik Kolay
        saveScore(userName, score, gameMode);

        setTimeout(() => {
            navigate(PATHS.LOSE_SCREEN.path, {
                state: {
                    userName,
                    score,
                    gameMode
                }
            });
        }, 1500);

        return (
            <div className="game-over-screen">
                <h1>KAYBETTIN!</h1>
                <p>Skorun: {score}</p>
                <p>Yönlendiriliyorsunuz...</p>
            </div>
        );
    }

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

            {/* Talimat */}
            <p className="game-instruction">
                Hangisi yapay zeka tarafından oluşturuldu? (1 doğru, 5 yanlış)
            </p>

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
