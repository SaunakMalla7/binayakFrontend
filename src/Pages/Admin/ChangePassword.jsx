import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from './Slider';

function ChangePassword() {
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
  const [newpassword, setnewpassword] = useState('');
  const [currentpassword, setcurrentpassword] = useState('');

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
  const passwordsubmit = (event) => {
    event.preventDefault();
    const password = {
      currentpassword,
      newpassword,
    };
    console.log('Sending data to server: ', user);
    axios
      .post(
        `https://localhost:7050/user/change-password?userId=${id}`,
        password
      )
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => alert(error));
  };
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
        <h1>Change User Password</h1>
        <br />
        <form onSubmit={passwordsubmit}>
          <div class="form-group">
            <label for="currentPassword">Current Password:</label>
            <input
              type="password"
              class="form-control"
              id="currentPassword"
              value={currentpassword}
              onChange={(e) => setcurrentpassword(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="newPassword">New Password:</label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              value={newpassword}
              onChange={(e) => setnewpassword(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Reset Password
          </button>
        </form>
        <br />
      </section>
    </>
  );
}

export default ChangePassword;
