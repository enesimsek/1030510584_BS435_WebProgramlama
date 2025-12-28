
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/Start/Home Screens/home'
import { SelectModePage } from './pages/Start/Select Mode Screens/selectMode'
import { PATHS } from './routes/paths'
import { SettingsPage } from './pages/Settings Screens/settings_page'
import { useEffect, useState } from 'react'
import { Sounds } from './components/Sound Player/sound_player'
import { EasyGameScreen } from './pages/Game Screens/Easy Mode/easyGameScreen'
import { NormalGameScreen } from './pages/Game Screens/Normal Mode/normalGameScreen'
import { ClassicHardGameScreen } from './pages/Game Screens/Hard Mode/hardGameScreen'
import { LoseScreen } from './pages/Game Screens/Lose Screen/loseScreen'
import { TimeAttackScreen } from './pages/Game Screens/Time Atacak/timeAttackScreen'

function App() {

  useEffect(() => {
    try {
      Sounds.bgStart();   // Sayfa açılınca başlat
      return () => Sounds.bgStop();
    } catch (error) {
      console.log('Ses dosyası yüklenemedi veya oynatılamadı.', error);
    }
  }, []);

  const [userName, setuserName] = useState("Robot");

  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME.path} element={<HomePage />} />
        <Route path={PATHS.SELECT_MODE.path} element={<SelectModePage userName={userName} setuserName={setuserName} />} />
        <Route path={PATHS.CLASSIC_EASY.path} element={<EasyGameScreen userName={userName} />} />
        <Route path={PATHS.CLASSIC_NORMAL.path} element={<NormalGameScreen userName={userName} />} />
        <Route path={PATHS.CLASSIC_HARD.path} element={<ClassicHardGameScreen userName={userName} />} />
        <Route path={PATHS.TIME_ATTACK.path} element={<TimeAttackScreen userName={userName} />} />
        <Route path={PATHS.SETTINGS.path} element={<SettingsPage userName={userName} setuserName={setuserName} />} />
        <Route path={PATHS.LOSE_SCREEN.path} element={<LoseScreen />} />
      </Routes>
    </div>
  );
}

export default App
