import { useState } from 'react';
import axios from 'axios';
import Slider from './Slider';
import { Button, Form } from 'react-bootstrap';

function AddStaff() {
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
      .post('https://localhost:7050/user/add-staff', user)
      .then((response) => {
        alert(response.data);
        window.location.href = `/licence-upload`;
        window.localStorage.setItem('licenseid', username);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Slider />
      <section class="home-section">
        <h1>Add Staff</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{' '}
            <br />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />{' '}
            <br />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />{' '}
            <br />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />{' '}
            <br />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />{' '}
            <br />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </section>
    </>
  );
}

export default AddStaff;
