import { useState, useEffect } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { Sounds } from '../../components/Sound Player/sound_player';
import { SettingsComp } from '../../components/Settings/settings_comp';
import { ImageCard } from '../../components/ImageCard/ImageCard';
import { AI_IMAGES } from '../../constants/aiImages';
import './classicEasyGameScreen.css';

type ClassicEasyGameScreenProps = { username: string; };


interface GameImage {
    id: string;
    url: string;
    isAI: boolean;
}

export const ClassicEasyGameScreen = ({ username }: ClassicEasyGameScreenProps) => {


    const [images, setImages] = useState<GameImage[]>([]);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    // Random AI görsel seç
    const getRandomAIImage = () => {
        const randomIndex = Math.floor(Math.random() * AI_IMAGES.length);
        return `/src/assets/aı_images/${AI_IMAGES[randomIndex]}`;
    };

    // Random gerçek görsel seç (Picsum)
    const getRealImage = () => {
        const randomId = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/400/300?random=${randomId}`;
    };

    // Yeni tur başlat
    const startNewRound = () => {
        const newImages: GameImage[] = [];

        // 2 gerçek görsel ekle
        for (let i = 0; i < 5; i++) {
            newImages.push({
                id: `real-${i}`,
                url: getRealImage(),
                isAI: false
            });
        }

        // 1 AI görsel ekle
        newImages.push({
            id: 'ai-1',
            url: getRandomAIImage(),
            isAI: true
        });

        // Görselleri karıştır
        const shuffled = newImages.sort(() => Math.random() - 0.5);
        setImages(shuffled);
        setShowResult(false);
        setSelectedImageId(null);
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
        return (
            <div className="game-over-screen">
                <h1>KAYBETTIN!</h1>
                <p>Skorun: {score}</p>
                <button onClick={() => {
                    setLives(3);
                    setScore(0);
                    setGameOver(false);
                    startNewRound();
                }}>
                    Tekrar Oyna
                </button>
            </div>
        );
    }

    return (
        <div className="classic-easy-game-screen">
            {/* Ayarlar Komponenti */}
            {showSettings && (
                <div className="settings-overlay">
                    <SettingsComp
                        callerPage="game"
                        onClose={() => setShowSettings(false)}
                    />
                </div>
            )}

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
                    <span>Oyuncu: {username}</span>
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
                    />
                ))}
            </div>
        </div>
    );
}
