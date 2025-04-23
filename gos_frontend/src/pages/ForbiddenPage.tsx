import NavBar from "../components/ui/Navbar2";
import '../../styles/LandingPage.css';

const ForbiddenPage = () => {
  return (
    <>
      <div className={'pageContainer'}>
        <div className={'contentWrapper'}>
          <NavBar />
          <main className={'heroContainer'}>
            <section className={'heroContent'}>
              <h1 className={'heroTitle'}>403 - Forbidden</h1>
              <h2 className={'heroTagline'}>You don't have permission to access this page.</h2>
              <p className={'heroDescription'}>
                Please contact the administrator if you believe this is a mistake.
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default ForbiddenPage;