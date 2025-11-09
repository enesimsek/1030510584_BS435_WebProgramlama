
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Start/Home Screens/home'
import { SelectMode } from './pages/Start/Select Mode Screens/selectMode'
import { PATHS } from './routes/paths'
import { SettingsPage } from './pages/Start/Settings Screens/settings_page'

function App() {
  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME.path} element={<Home />} />
        <Route path={PATHS.SELECT_MODE.path} element={<SelectMode />} />
        <Route path={PATHS.SETTINGS.path} element={<SettingsPage />} />

      </Routes>
    </div>
  );
}

export default App
