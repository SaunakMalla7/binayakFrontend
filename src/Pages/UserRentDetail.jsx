import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroPages from '../components/HeroPages';
import { Card, Button } from 'react-bootstrap';

function UserRentDetails() {
  const userid = localStorage.getItem('userid');
  const { id } = useParams(); // Get the rent ID from the URL parameter
  const [rent, setRent] = useState(null); // State to hold the rent object
  const [vehicle, setVehicle] = useState(null); // State to hold the vehicle object
  const [customer, setCustomer] = useState(null); // State to hold the vehicle object
  const [approver, setApprover] = useState(null); // State to hold the vehicle object

  useEffect(() => {
    // Fetch the rent details using the ID from the URL parameter
    fetch(`https://localhost:7050/rent/view-${id}`)
      .then((response) => response.json())
      .then((data) => setRent(data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    // Fetch the vehicle details using the vehicle ID from the rent object
    if (rent) {
      fetch(`https://localhost:7050/vehicle/view-vehicle-${rent.vechileId}`)
        .then((response) => response.json())
        .then((data) => setVehicle(data))
        .catch((error) => console.log(error));
    }
  }, [rent]);

  useEffect(() => {
    // Fetch the vehicle details using the vehicle ID from the rent object
    if (rent) {
      fetch(
        `https://localhost:7050/user/view-profile?userId=${rent.customerId}`
      )
        .then((response) => response.json())
        .then((data) => setCustomer(data))
        .catch((error) => console.log(error));
    }
  }, [rent]);

  useEffect(() => {
    // Fetch the vehicle details using the vehicle ID from the rent object
    if (rent) {
      fetch(
        `https://localhost:7050/user/view-profile?iserId=${rent.approvedBy}`
      )
        .then((response) => response.json())
        .then((data) => setApprover(data))
        .catch((error) => console.log(error));
    }
  }, [rent]);

  async function handleCancelClick() {
    const confirmed = window.confirm(
      'Are You Sure You want to Cancel This Request?'
    );
    if (!confirmed) {
      return;
    }

    const response = await fetch(
      `https://localhost:7050/rent/cancel-request?Rent_id=${id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    alert(data);
    window.location.href = '/rented';
  }

  async function handleReturnClick() {
    const confirmed = window.confirm(
      'Are You Sure You want to Return The Vehicle You need to pay'
    );
    if (!confirmed) {
      return;
    }

    const response = await fetch(
      `https://localhost:7050/rent/return?Rent_id=${id}`,
      {
        method: 'PATCH',
      }
    );
    const data = await response.json();
    const rentId = encodeURIComponent(id);
    window.location.href = `/payment`;
    window.localStorage.setItem('returnid', id);
  }

  if (!rent || !vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="contact-page">
        <Navbar />
        <HeroPages name="User Rented View " />
        <Card>
          <Card.Body>
            <Card.Title>Rent Details</Card.Title>
            <Card.Text>
              ID: {rent.id}
              <br />
              Rental Date: {rent.rentalDate}
              <br />
              Rent Duration: {rent.rentDuration}
              <br />
              Rent Status: {rent.rentStatus}
              <br />
              Is Approved: {rent.isApproved ? 'Yes' : 'No'}
              <br />
              Is Available: {rent.isAvailable ? 'Yes' : 'No'}
              <br />
              Approved By: {rent?.approvedBy}
              <br />
              Approved By: {approver?.userName}
              <br />
              Vehicle ID: {rent.vechileId}
              <br />
              Vehicle Name: {vehicle.name}
              <br />
              Vehicle Type: {vehicle.type}
              <br />
              Vehicle Brand: {vehicle.brand}
              <br />
              Vehicle No. of Seats: {vehicle.noOfSeat}
              <br />
              Vehicle Rent per Day: {vehicle.rentPerDay}
              <br />
              Vehicle Fuel Type: {vehicle.fuelType}
              <br />
              Vehicle Availability: {vehicle.isAvailable ? 'Yes' : 'No'}
              <br />
              Customer ID: {rent.customerId}
              <br />
              Customer ID: {customer?.userName}
              <br />
            </Card.Text>
            <Button variant="primary" onClick={() => handleReturnClick()}>
              Return
            </Button>{' '}
            <Button variant="secondary" onClick={() => handleCancelClick()}>
              Cancel
            </Button>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}

export default UserRentDetails;
