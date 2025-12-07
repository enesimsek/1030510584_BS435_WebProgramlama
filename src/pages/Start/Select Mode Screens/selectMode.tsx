import { useState } from "react";
import "./selectMode.css"
import klasik_kolay from "../../../assets/mode-images/klasik-kolay.png";
import klasik_normal from "../../../assets/mode-images/klasik-normal.png";
import klasik_zor from "../../../assets/mode-images/klasik-zor.png";
import zaman_karsi from "../../../assets/mode-images/zaman-karsi.png";
import hata_yok from "../../../assets/mode-images/hata-yok.png";
import ben_robot_degilim from "../../../assets/mode-images/ben-robot-degilim.png";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { PATHS } from "../../../routes/paths";
import { Sounds } from "../../../components/Sound Player/sound_player";
import squirrel_mod_select from "../../../assets/sincap-mod-ekranı.png";


type SelectModePageProps = {
    username: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectModePage = ({ username, setUserName }: SelectModePageProps) => {
    const navigate = useNavigate();

    const [selectedMode, setSelectedMode] = useState(1);


    const mods = [
        { id: 1, name: "Klasik Kolay", img: klasik_kolay },
        { id: 2, name: "Klasik Normal", img: klasik_normal },
        { id: 3, name: "Klasik Zor", img: klasik_zor },
        { id: 4, name: "Zamana Karşı", img: zaman_karsi },
        { id: 5, name: "Hata Yok", img: hata_yok },
        { id: 6, name: "Ben Robot Değilim", img: ben_robot_degilim },
    ];

    const descriptions: Record<number, string> = {
        1: `Herkesin bildiği klasik moddur. Görselleri ayırt etmesi çok kolaydır. 10 turdan oluşur. 
            Hata yaparsan puan kaybedersin. Daha yüksek puanlara ulaşmak için tüm turları doğru cevaplamaya çalış.`,
        2: `Klasik Orta mod, daha zor görseller içerir. 15 turdan oluşur. 
            Hata yaparsan puan kaybedersin. Daha yüksek puanlara ulaşmak için tüm turları doğru cevaplamaya çalış.`,
        3: `Klasik Zor mod, bakalım insan gibi düşünebiliyor musun? 20 turdan oluşur. 
            Hata yaparsan puan kaybedersin. Daha yüksek puanlara ulaşmak için tüm turları doğru cevaplamaya çalış.`,
        4: `Zamana karşı yarışırsın. Her saniye önemli! Doğru bildiğin sonuçlar için +2 saniye kazanır, yanlış bildiğin
        her tur için -10 sn kaybedersin. Süren biterse kaybedersin... Dikatli ol!`,
        5: `Bu modda tek bir hata sonun olur.Daha fazla puana ulaşmak için hata yapmadan cevapları doğru tahmin etmeye çalış. `,
        6: `Sen robot musun? `
    };
    const goPrevMode = () => {
        setSelectedMode((prev) => (prev === 1 ? mods.length : prev - 1));
    };

    const goNextMode = () => {
        setSelectedMode((prev) => (prev === mods.length ? 1 : prev + 1));
    };

    const gamePaths: Record<number, string> = {
        1: PATHS.CLASSIC_EASY.path,
        2: PATHS.CLASSIC_NORMAL.path,
        3: PATHS.CLASSIC_HARD.path,
        4: PATHS.TIME.path,
        5: PATHS.NO_MISTAKE.path,
        6: PATHS.I_AM_NOT_A_ROBOT.path,
    };

    return (
        <div className="select-page">

            <button className="selectMode back-button" onClick={async () => {
                await Sounds.clickAsync();
                navigate(PATHS.HOME.path)
            }}>
                ← Geri
            </button>

            {/* Sol Panel */}
            <div className="mode-info-box">
                <h1 className="mode-title">
                    {mods.find(m => m.id === selectedMode)?.name}
                </h1>

                <p className="mode-description">
                    {descriptions[selectedMode]}
                </p>
            </div>


            {/* Sol kısım Slider */}
            <div className="slider-box">
                <button onClick={async () => {
                    await Sounds.clickAsync();
                    goPrevMode();
                }} className="slider-arrow">‹</button>

                {/* Sol small card */}
                <div onClick={async () => {
                    await Sounds.clickAsync();
                    goPrevMode();
                }} className="small-card">
                    <img src={mods[(selectedMode - 2 + mods.length) % mods.length].img} className="card-img" />
                    <span>{mods[(selectedMode - 2 + mods.length) % mods.length].name}</span>
                </div>

                {/* Big card */}
                <div className="big-card">
                    <img src={mods[(selectedMode - 1 + mods.length) % mods.length].img} className="card-img-big" />
                    <span>{mods[(selectedMode - 1 + mods.length) % mods.length].name}</span>
                </div>

                {/* Sağ small card */}
                <div onClick={async () => {
                    await Sounds.clickAsync();
                    goNextMode();
                }} className="small-card">
                    <img src={mods[selectedMode % mods.length].img} className="card-img" />
                    <span>{mods[selectedMode % mods.length].name}</span>
                </div>
                <button onClick={async () => {
                    await Sounds.clickAsync();
                    goNextMode();
                }} className="slider-arrow">›</button>
            </div>

            {/* Sağ üst Settings ikonu */}
            <div className="settings-icon" onClick={async () => {
                await Sounds.clickAsync();
                navigate(PATHS.SETTINGS.path, {
                    state: { callerPage: PATHS.SELECT_MODE.path }
                })
            }}>
                <IoSettingsOutline />
            </div>

            <img src={squirrel_mod_select} className="right-decor-image" />

            {/* Sağ kısım */}
            <div className="play-area">
                <input
                    type="text"
                    className="username-input"
                    value={username}
                    placeholder="Kullanıcı adı"
                    onChange={(e) => setUserName(e.target.value)}
                />

                <button
                    className="play-button"
                    onClick={async () => {
                        await Sounds.clickAsync();
                        navigate(gamePaths[selectedMode], {
                            state: { mode: selectedMode, username }
                        });
                    }}
                >
                    Oyna
                </button>
            </div>




        </div>
    );
}
