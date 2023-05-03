import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import { Table } from 'react-bootstrap';

function ViewAllUsers() {
  const [users, setUsers] = useState(null); // State to hold the user list
  const [roles, setRoles] = useState({}); // State to hold the user roles

  useEffect(() => {
    // Fetch the user list from the API endpoint
    fetch('https://localhost:7050/user/view-all-users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  if (!users || !roles) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Slider />
      <section class="home-section">
        <h1>User List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Change Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>
                  <Link to={`/user-details/${user.id}/${user.userName}`}>
                    <button className="btn btn-primary">Edit User</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/ChangePassword/${user.id}/${user.userName}`}>
                    <button className="btn btn-primary">Change Password</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
}

export default ViewAllUsers;
