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
    const redirectUrl = location.state?.redirectUrl || "/user/profile";


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

    {/* handler for form submission */}
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signIn({username, password});
    }

    return (
      <div className="signInPage">
        <NavBar /> {/* add nav bar component */}
        <main className="signInContainer">
          {/* title text */}
            <h1 className="signInTitle">Sign In</h1>

            <form 
              className="signInForm"
              onSubmit={handleSubmit}
            >
              {/* if wrong password or username show error */}
              {
                isError && (
                <div className="error">
                  Invalid username or password
                </div>
                )
              }
              <label>
                {/* input for username */}
                <span>Username</span>
                <input 
                  type="text" 
                  name="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // update username state
                  autoFocus
                  required 
                />
              </label>
              <label>
                {/* input for password */}
                <span>Password</span>
                <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // update password state
                  onKeyDown={(e) => 
                    e.key === "Enter" && signIn({ username, password }) // trigger sign in on enter key
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
            {/* link to register page */}
            <p>Don't have an account?{" "}
              <Link to="/register">Sign Up</Link>
            </p>
        </main>
      </div>
    );
  };
  
  export default SignIn;
  