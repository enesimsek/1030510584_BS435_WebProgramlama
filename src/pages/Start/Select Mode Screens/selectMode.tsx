import { useState } from "react";
import "./selectMode.css"



type SelectModePageProps = {
    username: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectModePage = ({ username, setUserName }: SelectModePageProps) => {

    const [selectedMode, setSelectedMode] = useState(1);
    const [isHoveringPlay, setIsHoveringPlay] = useState(false);

    const mods = [
        { id: 1, name: "Klasik Kolay Mod" },
        { id: 2, name: "Klasik Orta Mod" },
        { id: 3, name: "Klasik Zor Mod" },
        { id: 4, name: "Zamana Karşı" },
        { id: 5, name: "Hata Yok" },
        { id: 6, name: "Ben Robot Değilim" },
    ];

    const descriptions: Record<number, string> = {
        1: `Herkesin bildiği klasik moddur. Görselleri ayırt etmesi çok kolaydır...`,
        2: `Klasik Orta mod, daha zor görseller içerir.`,
        3: `Klasik Zor mod, refleksleri test eder.`,
        4: `Zamana karşı yarışırsın. Her saniye önemli!`,
        5: `Bu modda tek bir hata sonun olur.`,
        6: `Sen robot musun? Bunu kanıtla!`
    };

    const goPrevMode = () => {
        setSelectedMode((prev) => (prev === 1 ? mods.length : prev - 1));
    };

    const goNextMode = () => {
        setSelectedMode((prev) => (prev === mods.length ? 1 : prev + 1));
    };

    return (
        <div className="select-page">
            {/* Geri */}
            <button className="back-btn">←</button>

            {/* Ayarlar */}
            <button className="settings-btn">⚙️</button>

            {/* Sol Panel */}
            <div className="mode-info-box">
                <h1 className="mode-title">
                    {mods.find(m => m.id === selectedMode)?.name}
                </h1>

                <p className="mode-description">
                    {descriptions[selectedMode]}
                </p>
            </div>

            {/* Slider */}
            <div className="slider-box">
                <button onClick={goPrevMode} className="slider-arrow">‹</button>

                <div onClick={goPrevMode} className="small-card">
                    {mods[(selectedMode - 2 + mods.length) % mods.length].name}
                </div>

                <div className="big-card">
                    {mods[(selectedMode - 1 + mods.length) % mods.length].name}
                </div>

                <div onClick={goNextMode} className="small-card">
                    {mods[selectedMode % mods.length].name}
                </div>

                <button onClick={goNextMode} className="slider-arrow">›</button>
            </div>

            {/* Sağ Panel */}
            <div className="right-panel">
                <input
                    type="text"
                    placeholder="Takma Ad"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="nickname-input"
                />

                <button
                    onMouseEnter={() => setIsHoveringPlay(true)}
                    onMouseLeave={() => setIsHoveringPlay(false)}
                    className={`play-btn ${isHoveringPlay ? "hover" : ""}`}
                >
                    Oyna
                </button>
            </div>

        </div>
    );
}
