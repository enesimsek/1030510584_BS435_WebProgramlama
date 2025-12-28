import "./home.css";
import { Leaderboard } from "../../../components/Leader Board/leaderbord";
import { Footer } from "../../../components/Footer/footer";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import { Sounds } from "../../../components/Sound Player/sound_player";
import { useState, useEffect } from "react";
import { getLeaderboard } from "../../../services/leaderboard_service";



export const HomePage = () => {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    // localStorage'dan leaderboard'u yükle
    useEffect(() => {
        setLeaderboard(getLeaderboard());
    }, []);



    //Örnek Modlar
    const mods = [
        { name: "Klasik Kolay", id: 1 },
        { name: "Klasik Orta", id: 2 },
        { name: "Klasik Zor", id: 3 },
        { name: "Zamana Karşı", id: 4 },

    ];



    return (
        <>
            {/* Butonlar */}
            <div className="start-page-button-container">
                <button className="start-page-buttons" onClick={async () => {
                    // müzik oynatılana kadar bekler
                    await Sounds.clickAsync();
                    Sounds.bgStart();
                    navigate(PATHS.SELECT_MODE.path);
                }} >BAŞLA</button>
                <button className="start-page-buttons" onClick={async () => {
                    await Sounds.clickAsync();
                    setTimeout(() => {
                        navigate(PATHS.SETTINGS.path, {
                            state: { callerPage: PATHS.HOME.path }
                        });
                    }, 150)
                }}>AYARLAR</button>
                <button className="start-page-buttons" onClick={async () => {
                    await Sounds.clickAsync();
                }}>EMEĞİ GEÇENLER</button>
            </div>
            {/* Lider Tablosu */}
            <Leaderboard leaderboard={leaderboard} mods={mods} />
            {/* Footer */}
            <Footer />

        </>
    );
};
