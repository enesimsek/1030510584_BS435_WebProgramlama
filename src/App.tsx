
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/Start/Home Screens/home'
import { SelectModePage } from './pages/Start/Select Mode Screens/selectMode'
import { PATHS } from './routes/paths'
import { SettingsPage } from './pages/Settings Screens/settings_page'
import { useEffect, useState } from 'react'
import { Sounds } from './components/Sound Player/sound_player'
import { ClassicEasyGameScreen } from './pages/Game Screens/classicEasyGameScreen'

function App() {

  useEffect(() => {
    try {
      Sounds.bgStart();   // Sayfa açılınca başlat
      return () => Sounds.bgStop();   // Sayfadan çıkınca durdur
    } catch (error) {
      console.log('Sound player not available');
    }
  }, []);

  const [username, setUserName] = useState("Robot");

  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME.path} element={<HomePage />} />
        <Route path={PATHS.SELECT_MODE.path} element={<SelectModePage username={username} setUserName={setUserName} />} />
        <Route path={PATHS.CLASSIC_EASY.path} element={<ClassicEasyGameScreen username={username} />} />
        <Route path={PATHS.SETTINGS.path} element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App
