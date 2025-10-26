import { useState } from "react";
import "./learderboard.css"


type LeaderboardEntry = {
    rank: number;
    name: string;
    score: number;
};

export const Leaderboard = ({ leaderboard }: { leaderboard: LeaderboardEntry[] }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="leaderboard-container">
            <div className="leader-board">
                <div className="leader-board-header">
                    <h2>Skor Tablosu</h2>
                    <div className="game-mode-container">
                        <button
                            className="game-mode-button"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            Oyun Modu ▾
                        </button>
                        {menuOpen && (
                            <div className="game-mode-menu">
                                <button>Klasik Üçlü</button>
                                <button>Zamana Karşı</button>
                                <button>Hata Yok</button>
                            </div>
                        )}
                    </div>
                </div>

                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>İsim</th>
                            <th>Skor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((e) => (
                            <tr key={e.rank} className={`rank-${e.rank}`}>
                                <td>{e.rank}</td>
                                <td>{e.name}</td>
                                <td>{e.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
