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
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    mutate: createAccount,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/user/profile", {
        replace: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (username.length < 8) {
      setUsernameError("Username must be at least 8 characters.");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    } else {
      setUsernameError("");
    }
    createAccount({ username, password, confirmPassword });
  };  

  const extractErrorMessage = (error: any): string | null => {
    if (!error) return null;
  
    // Check if the error is a Zod validation error
    if (error.issues && Array.isArray(error.issues)) {
      return error.issues[0]?.message || null;
    }

    // Check if the error is a standard backend error
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    console.log('here')
    // Fallback to a generic error message
    return error.message || null;
  };

  return (
    <div className="registerPage">
      <NavBar />
      <main className="registerContainer">
        <section className="registerLeft">
          <h1 className="registerTitle">Get Started</h1>
          <img src={registerImage} className="registerImage" alt=""/>
        </section>

        <section className="registerRight">
          <form 
            className="registerForm"
            onSubmit={handleSubmit}
          >
            {
              isError && (
              <div className="error">
                { extractErrorMessage(error) || "An error ocurred" }
              </div>
              )
            } 
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
              {usernameError && <div className="inputError">{usernameError}</div>}
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
              />
              {passwordError && <div className="inputError">{passwordError}</div>}
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