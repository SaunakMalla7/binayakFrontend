import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import { Table } from 'react-bootstrap';

function InactiveUser() {
  const [users, setUsers] = useState(null); // State to hold the user list
  const [roles, setRoles] = useState({}); // State to hold the user roles

  useEffect(() => {
    // Fetch the user list from the API endpoint
    fetch('https://localhost:7050/user/inactive-users')
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
        <div>
          <h1>Inactive User List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>ViewDetails</th>
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
                      <button>View Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default InactiveUser;
