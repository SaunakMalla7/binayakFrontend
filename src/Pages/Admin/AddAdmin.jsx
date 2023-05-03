import { useState } from 'react';
import axios from 'axios';
import Slider from './Slider';

function AddAdmin() {
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
      .post('https://localhost:7050/user/add-admin', user)
      .then((response) => {
        alert(response.data);
        // window.location.href = `/licence-upload`;
        // window.localStorage.setItem('licenseid', username);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Slider />
      <section className="home-section c mt-4">
        <h1>Add Admin</h1>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary mt-3">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddAdmin;
