import "./home.css";
import { Leaderboard } from "../../../components/Start/leaderbord";
import { Footer } from "../../../components/footer";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import { Sounds } from "../../../components/Sound Player/sound_player";



export const HomePage = () => {
    const navigate = useNavigate();



    //Örnek Modlar
    const mods = [
        { name: "Klasik Kolay", id: 1 },
        { name: "Klasik Orta", id: 2 },
        { name: "Klasik Zor", id: 3 },

        { name: "Zamana Karşı", id: 4 },
        { name: "Hata Yok", id: 5 },
        { name: "Ben robot Değilim", id: 6 },

    ];

    //Örnek Skorlar 
    const leaderboard = [
        //Klasik Kolay
        { rank: 1, name: "Enes", score: 980, mod: 1 },
        { rank: 2, name: "Merve", score: 870, mod: 1 },
        { rank: 3, name: "Ahmet", score: 760, mod: 1 },
        { rank: 4, name: "Yaren", score: 640, mod: 1 },
        { rank: 5, name: "Sena", score: 500, mod: 1 },
        //Zamana Karşı
        { rank: 1, name: "Enes", score: 980, mod: 4 },
        { rank: 2, name: "Merve", score: 870, mod: 4 },
        { rank: 3, name: "Ahmet", score: 760, mod: 4 },
        //Hata Yok

        { rank: 1, name: "Yaren", score: 640, mod: 5 },
        { rank: 2, name: "Sena", score: 500, mod: 5 },
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
