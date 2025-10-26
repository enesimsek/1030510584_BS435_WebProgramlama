import "./start.css";
import { Leaderboard } from "../../components/Start/leaderbord";
import { Footer } from "../../components/footer";

export const Start = () => {

    //Örnek skorlar 
    const leaderboard = [
        { rank: 1, name: "Enes", score: 980 },
        { rank: 2, name: "Merve", score: 870 },
        { rank: 3, name: "Ahmet", score: 760 },
        { rank: 4, name: "Yaren", score: 640 },
        { rank: 5, name: "Sena", score: 500 },
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
            <Leaderboard leaderboard={leaderboard} />
            {/* Footer */}
            <Footer />

        </>
    );
};
