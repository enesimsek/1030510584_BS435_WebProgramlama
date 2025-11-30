import { useLocation } from "react-router-dom";
import { SettingsComp } from "../../../components/Settings/settings_comp";
import { PATHS } from "../../../routes/paths";

export const SettingsPage = () => {
    const location = useLocation();
    const callerPage = location.state?.callerPage || PATHS.HOME; // fallback: home

    return (
        <div>
            <SettingsComp callerPage={callerPage} />
        </div>
    );
};
