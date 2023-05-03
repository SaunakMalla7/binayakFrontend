import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function LicenceUpload(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const username = localStorage.getItem('licenseid');
  const [userId, setUserId] = useState('');
  const [file, setFile] = useState(null);

  // Fetch all users from the API on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://localhost:7050/user/view-all-users')
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      });
  }, []);

  // Search for the user ID when users state is updated
  useEffect(() => {
    const user = users.find((user) => user.userName === username);
    if (user) {
      setUserId(user.id);
    } else {
      setUserId('User not found');
    }
  }, [users, username]);

  // Handle form submission to upload license image
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('license', file);

    axios
      .post(
        `https://localhost:7050/user/upload-license?userId=${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        alert(response.data);
        window.location.href = `/login`;
      })
      .catch((error) => {
        console.log('Error uploading license:', error);
        setIsLoading(false);
        alert('Error uploading license');
      });
  };

  // Update username state when input value changes

  // Update file state when input value changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1>Upload Driving Licence</h1>
              <label htmlFor="file">Select a file:</label>
              <input type="file" id="file" onChange={handleFileChange} />
              <br />
              <br />
              <button type="submit">Upload</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default LicenceUpload;
