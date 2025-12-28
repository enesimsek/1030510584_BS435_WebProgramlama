import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';
import './loseScreen.css';

type LoseScreenProps = {
    userName: string;
    score: number;
    gameMode: number;
};

export const LoseScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userName, score, gameMode } = location.state as LoseScreenProps;

    const modeNames: Record<number, string> = {
        1: 'Klasik Kolay',
        2: 'Klasik Normal',
        3: 'Klasik Zor',
        4: 'Zamanlı',
        5: 'Hatasız',
        6: 'I Am Not A Robot',
    };

    const handlePlayAgain = () => {
        // Oyun moduna göre ilgili sayfaya yönlendir
        const gamePaths: Record<number, string> = {
            1: PATHS.CLASSIC_EASY.path,
            2: PATHS.CLASSIC_NORMAL.path,
            3: PATHS.CLASSIC_HARD.path,
            4: PATHS.TIME_ATTACK.path,
        };

        navigate(gamePaths[gameMode], {
            state: { username: userName }
        });
    };

    const handleModeSelect = () => {
        navigate(PATHS.SELECT_MODE.path);
    };

    return (
        <div className="lose-screen">
            <div className="lose-screen-content">
                <h1 className="lose-title">KAYBETTIN! 💔</h1>
                <div className="lose-info">
                    <p className="game-mode">Mod: <span>{modeNames[gameMode] || 'Bilinmiyor'}</span></p>
                    <p className="player-name">Oyuncu: <span>{userName}</span></p>
                    <p className="player-score">Skorun: <span>{score}</span></p>
                </div>
                <div className="lose-buttons">
                    <button className="btn-play-again" onClick={handlePlayAgain}>
                        🎮 Yeniden Oyna
                    </button>
                    <button className="btn-go-home" onClick={handleModeSelect}>
                        🏠 Mod Seçim Sayfasına Dön
                    </button>
                </div>
            </div>
        </div>
    );
};
