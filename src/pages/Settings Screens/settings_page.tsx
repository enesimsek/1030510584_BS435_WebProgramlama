import { useLocation } from "react-router-dom";
import { SettingsComp } from "../../components/Settings/settings_comp";
import { PATHS } from "../../routes/paths";

type SettingsPageProps = {
    userName: string;
    setuserName: (name: string) => void;
};

export const SettingsPage = ({ userName, setuserName }: SettingsPageProps) => {
    const location = useLocation();
    const callerPage = location.state?.callerPage || PATHS.HOME; // fallback: home

    return (
        <div>
            <SettingsComp userName={userName} setuserName={setuserName} callerPage={callerPage} />
        </div>
    );
};
