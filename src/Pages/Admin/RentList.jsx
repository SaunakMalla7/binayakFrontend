import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import { Table } from 'react-bootstrap';

function RentList() {
  const userid = localStorage.getItem('userid');
  const [rents, setRents] = useState([]);

  useEffect(() => {
    fetchRents();
  }, []);

  function ViewDetails({ id }) {
    return (
      <Link to={`/rent/${id}`}>
        <button>View Details</button>
      </Link>
    );
  }

  async function fetchRents() {
    const response = await fetch('https://localhost:7050/rent/view-all');
    const data = await response.json();
    setRents(data);
  }

  async function handleApproveClick(id) {
    const confirmed = window.confirm(
      'Are you sure you want to approve this rent request?'
    );
    if (!confirmed) {
      return;
    }

    const response = await fetch(
      `https://localhost:7050/rent/approve-request/${id}` + '?userId=' + userid,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    alert('Successfully Approved');
    fetchRents();
  }

  async function handleDeclineClick(id) {
    const confirmed = window.confirm(
      'Are you sure you want to decline this rent request?'
    );
    if (!confirmed) {
      return;
    }

    const response = await fetch(
      `https://localhost:7050/rent/delete-request?Rent_id=${id}`,
      {
        method: 'DELETE',
      }
    );
    //const data = await response.();
    alert('Successfully Declined');
    fetchRents();
  }

  return (
    <>
      <Slider />
      <section class="home-section">
        <h1>Rent List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Rental Date</th>
              <th>Rent Request Date</th>
              <th>Rent Duration</th>
              <th>Rent Status</th>
              <th>Approved By</th>
              <th>Vehicle ID</th>
              <th>Customer ID</th>
              <th>Actions</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent) => (
              <tr key={rent.id}>
                <td>{rent.id}</td>
                <td>{String(rent.rentalDate).substring(0, 10)}</td>
                <td>{String(rent.rent_request_date).substring(0, 10)}</td>
                <td>{rent.rentDuration} Days</td>
                <td>
                  {rent.rentStatus === 1 && <span>Pending</span>}
                  {rent.rentStatus === 2 && <span>Approved</span>}
                </td>
                <td>{rent.approvedBy}</td>
                <td>{rent.vechileId}</td>
                <td>{rent.customerId}</td>
                <td>
                  {rent.rentStatus !== 2 && (
                    <>
                      <td>
                        <button
                          class="btn btn-success"
                          onClick={() => handleApproveClick(rent.id)}
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          onClick={() => handleDeclineClick(rent.id)}
                        >
                          Decline
                        </button>
                      </td>
                    </>
                  )}
                </td>
                <td>
                  <Link to={`/rent/${rent.id}`}>
                    <button class="btn btn-primary">View Details</button>
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

export default RentList;
