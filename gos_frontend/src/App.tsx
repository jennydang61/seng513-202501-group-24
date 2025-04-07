import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage' 
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Stockpage from './pages/StockPage'
import Leaderboard from './pages/Leaderboard'
import ProfilePage from './pages/ProfilePage'

import '../styles/App.css'

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trade" element={<Stockpage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  )
}

export default App
