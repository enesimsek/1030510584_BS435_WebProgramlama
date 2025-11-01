import "./start.css";
import { Leaderboard } from "../../components/Start/leaderbord";
import { Footer } from "../../components/footer";

export const Start = () => {

    //Örnek skorlar 
    const leaderboard = [
        { rank: 1, name: "Enes", score: 980, mod: 1 },
        { rank: 2, name: "Merve", score: 870, mod: 1 },
        { rank: 3, name: "Ahmet", score: 760, mod: 1 },
        { rank: 4, name: "Yaren", score: 640, mod: 1 },
        { rank: 5, name: "Sena", score: 500, mod: 1 },
    ];



    const mods = [
        { name: "Klasik", id: 1 },
        { name: "Zamana Karşı", id: 2 },
        { name: "Hata Yok", id: 3 },
    ];





    return (
        <>
            {/* Butonlar */}
            <div className="start-page-button-container">
                <button className="start-page-buttons">BAŞLA</button>
                <button className="start-page-buttons">AYARLAR</button>
                <button className="start-page-buttons">NASIL OYNANIR</button>
            </div>
            {/* Skor Tablosu */}
            <Leaderboard leaderboard={leaderboard} mods={mods} />
            {/* Footer */}
            <Footer />

        </>
    );
};
