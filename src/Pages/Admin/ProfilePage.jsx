import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from './Slider';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';

function ProfilePage() {
  const id = localStorage.getItem('userid');
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
        <h1>Profile Page</h1>
        <br />
        <form class="form-inline" onSubmit={handleSubmit}>
          <div class="form-group mr-3">
            <label for="address" class="mr-2">
              Address:
            </label>
            <input
              type="text"
              class="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="form-group mr-3">
            <label for="phone" class="mr-2">
              Phone Number:
            </label>
            <input
              type="text"
              class="form-control"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </form>
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
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className=" h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                  <MDBRow className="g-0">
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: '.5rem',
                        borderBottomLeftRadius: '.5rem',
                      }}
                    >
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid
                      />
                      <MDBTypography tag="h5">
                        {user.firstName} {user.lastName}
                      </MDBTypography>
                      <MDBCardText>{user.userName}</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Location</MDBTypography>
                            <MDBCardText className="text-muted">
                              {user.address}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">
                              {user.phoneNumber}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">
                              {user.address}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <MDBIcon fab icon="facebook me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="twitter me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="instagram me-3" size="lg" />
                          </a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </section>
    </>
  );
}

export default ProfilePage;
