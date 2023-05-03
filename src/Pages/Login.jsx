import { useState } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
import HeroPages from '../components/HeroPages';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // define loggedIn state variable

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7050/user/login', {
        Username: username,
        Password: password,
      });
      console.log(response); // debug: log response
      if (response && response.data) {
        const { role, userId, username } = response.data;
        window.localStorage.setItem('userrole', role);
        window.localStorage.setItem('userid', userId);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('isloggedin', true);
        setLoggedIn(true); // update the loggedIn state to true
        // navigate('/');
        if (role === 'AdminUser' || role === 'StaffUser') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (ex) {
      setError(ex.response.data); // display error message
    }
  };

  return (
    <>
      {/* <HeroPages name="Our Login" /> */}
      <Navbar />
      <br />
      <br />
      <br />
      <br />

      <div class="form">
        <div class="left">
          <div class="overlay">
            <h1>Car Rent</h1>
            <h4>Signup To Rent the Car</h4>
            <a href="register">
              <button type="button" class="BrowseBtn">
                Signup
              </button>
            </a>
          </div>
        </div>
        <div class="right">
          <h1 className="login">Login</h1>
          <p>
            Don't have an account? <a href="register">Create Your Account</a> it
            takes less than a minute
          </p>
          <form onSubmit={handleSubmit}>
            <div class="inputs">
              <input
                placeholder="Username"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="inputs">
              <input
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="d-flex justify-content-between">
              {error && <div>{error}</div>}
              <button class="Login btn btn-primary mr-2" type="submit">
                Login
              </button>
              {/* <a href="signup">
                <button class="btn btn-secondary">Signup</button>
              </a> */}
            </div>

            {/* <button type="submit">Login</button> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
