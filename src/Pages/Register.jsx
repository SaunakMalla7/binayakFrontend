import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
    };
    console.log('Sending data to server: ', user);
    axios
      .post('https://localhost:7050/user/register-user', user)
      .then((response) => {
        alert(response.data);
        window.location.href = `/licence-upload`;
        window.localStorage.setItem('licenseid', username);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div class="form">
        <div class="left">
          <div class="overlay">
            <h1>Car Rent</h1>
            <h4>Signup To Rent the Car</h4>
            <a href="/login">
              <button type="button" class="BrowseBtn">
                Login
              </button>
            </a>
          </div>
        </div>
        <div class="right">
          <h1 className="login">Signup</h1>

          <form onSubmit={handleSubmit}>
            <div class="inputs">
              <input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            &nbsp;
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            &nbsp;
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              placeholder="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
