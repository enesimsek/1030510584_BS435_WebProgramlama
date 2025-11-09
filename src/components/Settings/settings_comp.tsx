
import { useNavigate } from "react-router-dom";
import "./settings_comp.css"
import { PATHS } from "../../routes/paths";



type SettingsCompProps = {
    callerPage: string;
    onClose?: () => void;
};

//callerPage "settings" veye "game" olabilir
export const SettingsComp = ({ callerPage, onClose }: SettingsCompProps) => {

    const navigate = useNavigate();


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
                    <input className="slider" type="range" min="0" max="100" />
                </div>

                <div className="settings-section">
                    <label className="label">MÜZİK</label>
                    <input className="slider" type="range" min="0" max="100" />
                </div>

                <div className="settings-section">
                    <label className="label">DİL</label>
                    <div className="lang-buttons">
                        <button className="lang-btn">EN</button>
                        <button className="lang-btn">TR</button>
                    </div>
                </div>
            </div>
        </div>
    )
}