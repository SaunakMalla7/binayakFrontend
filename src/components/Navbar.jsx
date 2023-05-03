import { Link } from 'react-router-dom';
import Logo from '../images/logo/logo1.png';
import { useState } from 'react';

function Navbar() {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem('isloggedin') === 'true'
  );
  const openNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    window.localStorage.removeItem('userrole');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('isloggedin');
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? 'open-nav' : ''}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>

            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <h1 className="logo">
              Hajur<span>KO</span>
              Car
              <span>Rental</span>
            </h1>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {' '}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {' '}
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              {' '}
              <Link className="contact-link" to="/profile">
                Your Profile
              </Link>
            </li>
            <li>
              {' '}
              <Link className="contact-link" to="/UserRented">
                UserRented
              </Link>
            </li>
          </ul>
          {loggedIn ? (
            <Link
              className="navbar__buttons__logout"
              to="/"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link className="navbar__buttons__sign-in" to="/login">
                Log In
              </Link>
              <Link className="navbar__buttons__register" to="/register">
                Register
              </Link>
            </>
          )}

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
