import { useState } from "react";
import NavBar from "../components/ui/Navbar";
import '../../styles/SignIn.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { login } from "../lib/api";

  const SignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const redirectUrl = location.state?.redirectUrl || "/";


    const {
        mutate: signIn,
        isPending,
        isError,
      } = useMutation({
        mutationFn: login, // api call to the backend
        onSuccess: () => {
          navigate(redirectUrl, {
            replace: true, // prevents going back to the login page when back is pressed after logging in
          });
        },
      });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signIn({username, password});
    }

    return (
      <div className="signInPage">
        <NavBar />
        <main className="signInContainer">
            <h1 className="signInTitle">Sign In</h1>
            {
              isError && (
              <div className="error">
                {/* needs styling */}
                Invalid username or password
              </div>
              )
            }
            <form 
              className="signInForm"
              onSubmit={handleSubmit}
            >
              <label>
                <span>Username</span>
                <input 
                  type="text" 
                  name="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
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
                  onKeyDown={(e) => 
                    e.key === "Enter" && signIn({ username, password })
                  } 
                  required 
                />
              </label>

              <button 
                type="submit" 
                disabled={!username || password.length < 8}
              >
                Sign In
              </button>
            </form>
            <p>Don't have an account?{" "}
              <Link to="/register">Sign Up</Link>
            </p>
        </main>
      </div>
    );
  };
  
  export default SignIn;
  