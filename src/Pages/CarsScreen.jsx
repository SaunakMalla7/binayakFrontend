import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import HeroPages from '../components/HeroPages';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const CarsScreen = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `https://localhost:7050/vehicle/view-vehicle-${id}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  const location = useLocation();
  const vehicleId = new URLSearchParams(location.search).get('id');
  const rent = new URLSearchParams(location.search).get('rentPerDay');
  const [vehicleImage, setVehicleImage] = useState('');
  const username = localStorage.getItem('username');
  const userrole = localStorage.getItem('userrole');
  const customerId = localStorage.getItem('userid');
  const [rentalDate, setRentalDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const [rentDuration, setRentDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      rentalDate: rentalDate,
      rentRequestDate: new Date(rentalDate).toISOString(),
      rentDuration: rentDuration,
      dailyRentRate: product.rentPerDay,
      vechileId: product.id,
      customerId: customerId,
      approvedBy: '',
    };

    const confirmRent = window.confirm(
      `Are you sure you want to rent this vehicle for RS${
        product.rentPerDay * rentDuration
      } per day?`
    );
    if (confirmRent) {
      axios
        .post('https://localhost:7050/rent/request', data)
        .then((response) => {
          alert(response.data);
          console.log(data.rentalDate);
          // Do something with the response, like displaying a success message
        })
        .catch((error) => {
          console.error(error);
          // Handle errors, like displaying an error message
        });
    }
  };

  return (
    <>
      <Navbar />

      <HeroPages name="Vehicle Models" />
      {/* <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="rental-date">Rental date:</label>
          <input
            type="date"
            id="rental-date"
            value={rentalDate}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(e) => setRentalDate(e.target.value)}
          />{' '}
          <label htmlFor="rent-duration">Rent duration:</label>
          <input
            type="number"
            id="rent-duration"
            value={rentDuration}
            onChange={(e) => setRentDuration(e.target.value)}
          />
          <button type="submit">Rent Vehicle</button>
        </form>
      </div> */}
      <div className="container pt-5">
        <div className="container pt-5 pb-3">
          <h1 className="CarName mb-4 text-uppercase">{product.name}</h1>
          <div className="row align-items-center pb-2">
            <div className="col-lg-6 mb-4">
              <img
                src={`https://localhost:7050/vehicle/view-vehicle-image/${product.id}`}
                className="card-img-top"
                alt="Vehicle"
              />
            </div>
            <div className="col-lg-6 mb-4">
              <h3 className="mb-2">Rs {product.rentPerDay}</h3>
              <p>per day</p>
              <h3 className="mb-2">Brand: {product.brand}</h3>
              <h3 className="mb-2">No Of Seat: {product.noOfSeat}</h3>
              <h2>{product.description}</h2>
              <div className="d-flex pt-1">
                <h6>Share on:</h6>
                <div className="d-inline-flex">
                  <a className="px-2" href="/">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a className="px-2" href="/">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a className="px-2" href="/">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="px-2" href="/">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="mb-4">Rent Detail</h1>
              <div>
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-auto">
                    <label htmlFor="rental-date" className="form-label">
                      Rental date:
                    </label>
                    <input
                      type="date"
                      id="rental-date"
                      className="form-control"
                      value={rentalDate}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => setRentalDate(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="rent-duration" className="form-label">
                      Rent duration:
                    </label>
                    <input
                      type="number"
                      id="rent-duration"
                      className="form-control"
                      value={rentDuration}
                      onChange={(e) => setRentDuration(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="Rent mb-3">
                      Rent Vehicle
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="col-lg-4">
              <div className="bg-secondary p-5 mb-5">
                <h2 className="text-primary mb-4">Payment</h2>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="paypal"
                    />
                    <label className="custom-control-label" for="paypal">
                      Paypal
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="directcheck"
                    />
                    <label className="custom-control-label" for="directcheck">
                      Direct Check
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer"
                    />
                    <label className="custom-control-label" for="banktransfer">
                      Bank Transfer
                    </label>
                  </div>
                </div>
                <button className="btn btn-block btn-primary py-3">
                  Reserve Now
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default CarsScreen;
