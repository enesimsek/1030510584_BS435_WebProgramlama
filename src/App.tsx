
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/Start/Home Screens/home'
import { SelectModePage } from './pages/Start/Select Mode Screens/selectMode'
import { PATHS } from './routes/paths'
import { SettingsPage } from './pages/Settings Screens/settings_page'
import { useEffect, useState } from 'react'
import { Sounds } from './components/Sound Player/sound_player'
import { ClassicEasyGameScreen } from './pages/Game Screens/classicEasyGameScreen'
import { LoseScreen } from './pages/Game Screens/Lose Screen/loseScreen'

function App() {

  useEffect(() => {
    try {
      Sounds.bgStart();   // Sayfa açılınca başlat
      return () => Sounds.bgStop();   // Sayfadan çıkınca durdur
    } catch (error) {
      console.log('Sound player not available');
    }
  }, []);

  const [userName, setuserName] = useState("Robot");

  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME.path} element={<HomePage />} />
        <Route path={PATHS.SELECT_MODE.path} element={<SelectModePage userName={userName} setuserName={setuserName} />} />
        <Route path={PATHS.CLASSIC_EASY.path} element={<ClassicEasyGameScreen userName={userName} />} />
        <Route path={PATHS.SETTINGS.path} element={<SettingsPage userName={userName} setuserName={setuserName} />} />
        <Route path={PATHS.LOSE_SCREEN.path} element={<LoseScreen />} />
      </Routes>
    </div>
  );
}

export default App
