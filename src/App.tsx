
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Start/home'
import { SelectMode } from './pages/Start/selectMode'
import { PATHS } from './routes/paths'

function App() {
  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME.path} element={<Home />} />
        <Route path={PATHS.SELECT_MODE.path} element={<SelectMode />} />

      </Routes>
    </div>
  );
}

export default App
