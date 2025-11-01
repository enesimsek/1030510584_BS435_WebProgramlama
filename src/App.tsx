
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Start } from './pages/Start/start'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
      </Routes>
    </div>
  );
}

export default App
