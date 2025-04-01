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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trade" element={<Stockpage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
