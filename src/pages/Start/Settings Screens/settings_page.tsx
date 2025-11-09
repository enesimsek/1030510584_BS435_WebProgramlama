import { useState } from "react"
import { SettingsComp } from "../../../components/Settings/settings_comp"

export const SettingsPage = () => {

    const [callerPage] = useState("settings");
    return (

        <div>
            <SettingsComp callerPage={callerPage} />
        </div>
    )


}