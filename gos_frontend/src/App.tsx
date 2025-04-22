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
import { setNavigate } from './lib/navigation'
import AdminContainer from './components/auth/AdminContainer'
import ForbiddenPage from './pages/ForbiddenPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  // setting up navigate fn so appClient can use the function outside of the react component
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<AppContainer />}>
          <Route index element={<LandingPage />} />
          {/* routes nested under user path */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="trade" element={<Stockpage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
        <Route path="/admin" element={<AdminContainer />}>
          <Route index element={<AdminPage />} />
        </Route>
        {/* define pages */}
        <Route path="/login" element={<SignIn />} />
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trade" element={<Stockpage />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
  )
}

export default App
