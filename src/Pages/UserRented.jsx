import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeroPages from '../components/HeroPages';
import Navbar from '../components/Navbar';

function UserRented() {
  const userid = localStorage.getItem('userid');
  const [rents, setRents] = useState([]);

  useEffect(() => {
    fetchRents();
  }, []);

  async function fetchRents() {
    const response = await fetch('https://localhost:7050/rent/view-all');
    const data = await response.json();
    const filteredData = data.filter(
      (rent) =>
        (rent.customerId === userid && rent.rentStatus === 2) ||
        rent.rentStatus === 1
    );
    setRents(filteredData);
  }

  return (
    <>
      <section className="contact-page">
        <Navbar />
        <HeroPages name="User Rented " />
        <br />
        <br />
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
              <th>VIewDetails</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent) => (
              <tr key={rent.id}>
                <td>{rent.id}</td>
                <td>{String(rent.rentalDate).substring(0, 10)}</td>
                <td>{String(rent.rentRequestDate).substring(0, 10)}</td>
                <td>{rent.rentDuration} Days</td>
                <td>{rent.rentStatus}</td>
                <td>{rent.approvedBy}</td>
                <td>{rent.vechileId}</td>
                <td>{rent.customerId}</td>
                <Link to={`/rents/${rent.id}`}>
                  <button className="btn btn-primary">View Details</button>
                </Link>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
}

export default UserRented;
