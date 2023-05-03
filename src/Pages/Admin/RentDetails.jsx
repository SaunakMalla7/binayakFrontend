import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from './Slider';

function RentDetails() {
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

  if (!rent || !vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Slider />
      <section class="home-section">
        <div class="container">
          <h1 class="mt-4 mb-4">Rent Details</h1>
          <div class="row">
            <div class="col-md-6">
              <h4>Rent Information</h4>
              <p>ID: {rent.id}</p>
              <p>Rental Date: {rent.rentalDate}</p>
              <p>Rent Duration: {rent.rentDuration}</p>
              <p>Rent Status: {rent.rentStatus}</p>
              <p>Is Approved: {rent.isApproved ? 'Yes' : 'No'}</p>
              <p>Is Available: {rent.isAvailable ? 'Yes' : 'No'}</p>
              <p>Approved By: {rent?.approvedBy}</p>
              {/* <p>Approved By: {approver?.userName}</p> */}
            </div>
            <div class="col-md-6">
              <h4>Vehicle Information</h4>
              <p>Vehicle ID: {rent.vechileId}</p>
              <p>Vehicle Name: {vehicle.name}</p>
              <p>Vehicle Type: {vehicle.type}</p>
              <p>Vehicle Brand: {vehicle.brand}</p>
              <p>Vehicle No. of Seats: {vehicle.noOfSeat}</p>
              <p>Vehicle Rent per Day: {vehicle.rentPerDay}</p>
              <p>Vehicle Fuel Type: {vehicle.fuelType}</p>
              <p>Vehicle Availability: {vehicle.isAvailable ? 'Yes' : 'No'}</p>
              <h4>Customer Information</h4>

              <p>Customer ID: {rent.customerId}</p>
              <p>Customer ID: {customer?.userName}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RentDetails;
