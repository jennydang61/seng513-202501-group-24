import NavBar from "../components/ui/Navbar";
import '../../styles/Register.css';
import registerImage from "/src/images/registerImage.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../lib/api";

const Register = () => {

  const navigate = useNavigate();
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAccount({ username, password, confirmPassword });
  }

  return (
    <div className="registerPage">
      <NavBar />
      <main className="registerContainer">
        <section className="registerLeft">
          <h1 className="registerTitle">Get Started</h1>
          <img src={registerImage} className="registerImage" />
        </section>

        <section className="registerRight">
        {
          isError && (
          <div className="error">
            {/* needs styling */}
            An error ocurred      
          </div>
          )
        }
          <form 
            className="registerForm"
            onSubmit={handleSubmit}
          >
            <label>
              <span>Username</span>
              <input 
                type="text" 
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Must be at least 8 characters long"
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input 
                type="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must be at least 8 characters long"
                required 
              />
            </label>
            <label>
              <span>Confirm Password</span>
              <input 
                type="password" 
                name="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  createAccount({ username, password, confirmPassword })
                }
                placeholder="Must match the password"
                required 
              />
            </label>
            <button type="submit">Register</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Register;
