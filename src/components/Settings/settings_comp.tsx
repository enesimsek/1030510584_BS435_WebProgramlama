
import { useNavigate } from "react-router-dom";
import "./settings_comp.css"
import { PATHS } from "../../routes/paths";
import { useEffect, useState } from "react";
import { Sounds } from "../Sound Player/sound_player";



type SettingsCompProps = {
    callerPage: string;
    onClose?: () => void;
};

//callerPage "settings" veye "game" olabilir
export const SettingsComp = ({ callerPage, onClose }: SettingsCompProps) => {

    const navigate = useNavigate();


    const [sfxValue, setSfxValue] = useState(100);
    const [musicValue, setMusicValue] = useState(50);


    useEffect(() => {
        setSfxValue(Sounds.getSfxVolume() * 100);
        setMusicValue(Sounds.getMusicVolume() * 100);
    }, []);



    return (
        <div className="settings-wrapper">
            {/* oyuna başlamadan önce ayarlar sayfası açılırsa  */}
            {callerPage === "settings" && (
                <button className="nav-btn back-btn" onClick={() => {
                    navigate(PATHS.HOME.path);
                }}>
                    ← GERİ
                </button>
            )}

            {/* oyun oynanması sırasında ayalar açılırsa  */}
            {callerPage === "game" && (
                <button className="nav-btn close-btn" onClick={onClose}>
                    ✕
                </button>
            )}

            <div className="settings-panel">
                <h1 className="settings-title">AYARLAR</h1>

                <div className="settings-section">
                    <label className="label"> TAKMA AD </label>
                    <input className="input" type="text" placeholder="Player123" />
                </div>

                <div className="settings-section">
                    <label className="label">SES</label>
                    <input
                        className="slider"
                        type="range"
                        min="0"
                        max="100"
                        value={sfxValue}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setSfxValue(val);
                            Sounds.setSfxVolume(val / 100);
                        }}
                    />
                </div>

                <div className="settings-section">
                    <label className="label">MÜZİK</label>
                    <input
                        className="slider"
                        type="range"
                        min="0"
                        max="100"
                        value={musicValue}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setMusicValue(val);

                            const normalized = val / 100;
                            Sounds.setMusicVolume(normalized);

                            if (normalized === 0) {
                                Sounds.bgStop();   // Ses sıfırsa müzik tamamen kapat
                            } else {
                                Sounds.bgStart();  //  sıfır değilse devam
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}