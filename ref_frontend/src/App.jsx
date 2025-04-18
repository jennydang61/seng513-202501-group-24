import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppContainer from "./components/AppContainer";

export const Home = () => {
  return <div>Home</div>
}

function App() {

  return <Routes>
    <Route path="/" element={<AppContainer />}>
      <Route index element={<Home />} />
      {/* <Route index element={<Profile />} /> */}
      {/* <Route path="settings" element={<Settings />} /> */}
    </Route>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
}

export default App
