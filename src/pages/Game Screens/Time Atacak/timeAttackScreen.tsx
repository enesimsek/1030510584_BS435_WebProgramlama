import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { Sounds } from '../../../components/Sound Player/sound_player';
import { SettingsComp } from '../../../components/Settings/settings_comp';
import { ImageCard } from '../../../components/ImageCard/ImageCard';
import { getGameImages } from '../../../services/getImage_service';
import type { GameImage } from '../../../services/getImage_service';
import { saveScore } from '../../../services/leaderboard_service';
import { PATHS } from '../../../routes/paths';
import './timeAttackScreen.css';

type TimeAttackProps = { userName: string };

export const TimeAttackScreen = ({ userName }: TimeAttackProps) => {
    //Doğru devapta +2 yanlış devapta -5 sn
    const navigate = useNavigate();

    const [images, setImages] = useState<GameImage[]>([]);
    const [score, setScore] = useState(0);
    const INITIAL_TIME = 40;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [showSettings, setShowSettings] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [, setLoadedCount] = useState(0);

    const timerRef = useRef<number | null>(null);

    const startNewRound = () => {
        const newImages = getGameImages(5, 1);
        setImages(newImages);
        setShowResult(false);
        setSelectedImageId(null);
        setImagesLoading(true);
        setLoadedCount(0);
    };

    const handleImageLoad = () => {
        setLoadedCount(prev => {
            const newCount = prev + 1;
            if (newCount === 6) setImagesLoading(false);
            return newCount;
        });
    };

    // Zamanlayıcı
    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, []);

    // Süre dolduğunda
    useEffect(() => {
        if (timeLeft <= 0) {
            if (timerRef.current) window.clearInterval(timerRef.current);
            const gameMode = 4; // Time
            saveScore(userName, score, gameMode);
            navigate(PATHS.LOSE_SCREEN.path, { state: { userName, score, gameMode } });
        }
    }, [timeLeft]);

    const handleCardSelect = (imageId: string, isCorrect: boolean) => {
        if (showResult || showSettings) return;

        setSelectedImageId(imageId);
        setShowResult(true);

        if (isCorrect) {
            setScore(s => s + 10);
            setTimeLeft(t => t + 3);
            setTimeout(() => startNewRound(), 1000);
        } else {
            setTimeLeft(t => t - 5);
            // Süre sıfırın altına düşerse kaybet
            setTimeout(() => startNewRound(), 1000);
        }
    };

    useEffect(() => {
        startNewRound();
    }, []);

    return (
        <div className="classic-easy-game-screen">
            {showSettings && (
                <div className="settings-overlay">
                    <SettingsComp userName={userName} callerPage="game" onClose={() => setShowSettings(false)} />
                </div>
            )}

            <button className="game-screen back-button" onClick={async () => {
                await Sounds.clickAsync();
                const gameMode = 4; // Time
                saveScore(userName, score, gameMode);
                navigate(PATHS.LOSE_SCREEN.path, { state: { userName, score, gameMode } });
            }}>✕ Pes Et</button>

            <div className="settings-icon" onClick={async () => { await Sounds.clickAsync(); setShowSettings(true); }}>
                <IoSettingsOutline />
            </div>

            <div className="game-header">
                <h1>Zamana Karşı Modu</h1>
                <div className="game-stats">
                    <span>Oyuncu: {userName}</span>
                    <span>Süre: {timeLeft}s</span>
                    <span>Skor: {score}</span>
                </div>
                {/* Zaman çubuğu */}
                <div className="time-bar" aria-hidden>
                    <div
                        className="time-bar-fill"
                        style={{ width: `${Math.max(0, Math.min(100, (timeLeft / INITIAL_TIME) * 100))}%` }}
                    />
                </div>
            </div>

            <div className="images-grid">
                {images.map(image => (
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
};
