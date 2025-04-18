import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import LandingPage from './pages/LandingPage' 
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Stockpage from './pages/StockPage'
import Leaderboard from './pages/Leaderboard'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

import '../styles/App.css'
// import Home from './pages/Home'
import AppContainer from './components/auth/AppContainer'
import Settings from './pages/Settings'
import { setNavigate } from './lib/navigation'

function App() {
  // setting up navigate fn so appClient can use the function outside of the react component
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<AppContainer />}>
          <Route index element={<LandingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="trade" element={<Stockpage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trade" element={<Stockpage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
  )
}

export default App
