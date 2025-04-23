import NavBar from "../components/ui/Navbar2";
import '../../styles/LandingPage.css';

const NotFoundPage = () => {
  return (
    <>
      <div className={'pageContainer'}>
        <div className={'contentWrapper'}>
          <NavBar />
          <main className={'heroContainer'}>
            <section className={'heroContent'}>
              <h1 className={'heroTitle'}>404 - Page Not Found</h1>
              <h2 className={'heroTagline'}>Oops! The page you're looking for doesn't exist.</h2>
              <p className={'heroDescription'}>
                Please check the URL or return to the homepage.
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;