import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserRentedDetails() {
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
    alert('Successfully Returned');
    const rentId = encodeURIComponent(id);
    window.location.href = `/payment`;
    window.localStorage.setItem('returnid', id);
  }

  if (!rent || !vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Rent Details</h1>
      <p>ID: {rent.id}</p>
      <p>Rental Date: {rent.rentalDate}</p>
      <p>Rent Duration: {rent.rentDuration}</p>
      <p>Rent Status: {rent.rentStatus}</p>
      <p>Is Approved: {rent.isApproved ? 'Yes' : 'No'}</p>
      <p>Is Available: {rent.isAvailable ? 'Yes' : 'No'}</p>
      <p>Approved By: {rent?.approvedBy}</p>
      <p>Approved By: {approver?.userName}</p>

      <p>Vehicle ID: {rent.vechileId}</p>
      <p>Vehicle Name: {vehicle.name}</p>
      <p>Vehicle Type: {vehicle.type}</p>
      <p>Vehicle Brand: {vehicle.brand}</p>
      <p>Vehicle No. of Seats: {vehicle.noOfSeat}</p>
      <p>Vehicle Rent per Day: {vehicle.rentPerDay}</p>
      <p>Vehicle Fuel Type: {vehicle.fuelType}</p>
      <p>Vehicle Availability: {vehicle.isAvailable ? 'Yes' : 'No'}</p>
      <p>Customer ID: {rent.customerId}</p>
      <p>Customer ID: {customer?.userName}</p>

      <>
        <button onClick={() => handleReturnClick()}>Return</button>

        <button onClick={() => handleCancelClick()}>Cancel</button>
      </>
    </div>
  );
}

export default UserRentedDetails;
