import { useState } from "react";
import "./learderboard.css"


type LeaderboardEntry = {
    rank: number;
    name: string;
    score: number;
    mod: number;
};
type Mods = {
    name: string;
    id: number;
}

export const Leaderboard = ({ leaderboard, mods }: { leaderboard: LeaderboardEntry[], mods: Mods[] }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedMod, setSelectedMod] = useState(mods[0].id);



    const filteredLeaderboard = leaderboard.filter((e) => e.mod == selectedMod);

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
                            {mods.find((mod) => mod.id === selectedMod)?.name} ▾
                        </button>
                        {menuOpen && (
                            <div className="game-mode-menu">
                                {mods.map((mod, index) => (
                                    <button
                                        key={mods[index].name}
                                        onClick={() => {
                                            setSelectedMod(mod.id);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        {mod.name}
                                    </button>
                                ))}
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
                            <th>Oyun Modu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaderboard.map((e) => (
                            <tr key={e.rank} className={`rank-${e.rank}`}>
                                <td>{e.rank}</td>
                                <td>{e.name}</td>
                                <td>{e.score}</td>
                                <td>{mods.find((mod) => mod.id === selectedMod)?.name}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
