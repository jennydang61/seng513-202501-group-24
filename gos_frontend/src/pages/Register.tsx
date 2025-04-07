import NavBar from "../components/ui/Navbar";
import '../../styles/Register.css';
import registerImage from "/src/images/registerImage.png";
import { useState } from "react";

const Register = () => {

  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="registerPage">
      <NavBar />
      <main className="registerContainer">
        <section className="registerLeft">
          <h1 className="registerTitle">Get Started</h1>
          <img src={registerImage} className="registerImage" />
        </section>

        <section className="registerRight">
          <form className="registerForm">
            <label>
              <span>Username</span>
              <input type="text" name="username" required />
            </label>
            <label>
              <span>Password</span>
              <input type="password" name="password" required />
            </label>
            <label>
              <span>Confirm Password</span>
              <input 
                type="password" 
                name="confirmPassword" 
                value={confirmPassword}
                required />
            </label>
            <button type="submit">Register</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Register;
