import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from './Slider';

function UserDetails() {
  const { id } = useParams();
  const { user_name } = useParams();
  const [user, setUser] = useState([]);
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);

  const username = '';
  const firstName = '';
  const lastName = '';
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Fetch the user data from the API endpoint
    fetch(`https://localhost:7050/user/view-profile?userId=${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));

    // Fetch the user roles data from the API endpoint
    fetch(`https://localhost:7050/user/userRole/${username}`)
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      firstName,
      lastName,
      address,
      phoneNumber,
    };
    console.log('Sending data to server: ', user);
    axios
      .put(`https://localhost:7050/user/update-user-${id}`, user)
      .then((response) => {
        alert('Updated Successfully');
        fetch(`https://localhost:7050/user/view-profile?userId=${id}`)
          .then((response) => response.json())
          .then((data) => setUser(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Slider />
      <section class="home-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Edit User Profile</h1>
              <div>
                <br />
                <h2>Address: {user.address}</h2>
                <br />
                <h2>phoneNumber: +977 {user.phoneNumber}</h2>
              </div>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDetails;
