import NavBar from "../components/ui/Navbar";
import '../../styles/SignIn.css';

  const SignIn = () => {
    return (
      <div className="signInPage">
        <NavBar />
        <main className="signInContainer">
            <h1 className="signInTitle">Sign In</h1>
            <form className="signInForm">
              <label>
                <span>Username</span>
                <input type="text" name="username" required />
              </label>
              <label>
                <span>Password</span>
                <input type="password" name="password" required />
              </label>

              <button type="submit">Sign In</button>
            </form>
        </main>
      </div>
    );
  };
  
  export default SignIn;
  