
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/Start/Home Screens/home'
import { SelectModePage } from './pages/Start/Select Mode Screens/selectMode'
import { PATHS } from './routes/paths'
import { SettingsPage } from './pages/Start/Settings Screens/settings_page'
import { useEffect, useState } from 'react'
import { Sounds } from './components/Sound Player/sound_player'

function App() {

  useEffect(() => {
    Sounds.bgStart();   // Sayfa açılınca başlat
    return () => Sounds.bgStop();   // Sayfadan çıkınca durdur
  }, []);

  const [username, setUserName] = useState("Robot");

  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME.path} element={<HomePage />} />
        <Route path={PATHS.SELECT_MODE.path} element={<SelectModePage username={username} setUserName={setUserName} />} />
        <Route path={PATHS.SETTINGS.path} element={<SettingsPage />} />

      </Routes>
    </div>
  );
}

export default App
