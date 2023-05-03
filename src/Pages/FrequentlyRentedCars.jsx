import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FrequentlyRentedCars() {
  const [frequentlyRentedCars, setFrequentlyRentedCars] = useState([]);

  useEffect(() => {
    async function fetchFrequentlyRentedCars() {
      const response = await fetch(
        'https://localhost:7050/rent/frequently-rented-cars'
      );
      const data = await response.json();
      setFrequentlyRentedCars(data);
      console.log(data);
    }
    fetchFrequentlyRentedCars();
  }, []);

  return (
    <section className="container products">
      <h1 className="AvailableCars">
        Frequently Rented &nbsp;
        <span>Cars</span>
      </h1>
      <Row>
        <div className="models-div">
          {frequentlyRentedCars.map((veh) => (
            <Col xs={10} md={6} lg={4} key={veh.id} className="container mb-3">
              <div className="models-div__box">
                <div className="models-div__box__img">
                  {/* <img src={CarImg1} alt="car_img" /> */}
                  <img
                    src={`https://localhost:7050/vehicle/view-vehicle-image/${veh.id}`}
                    className="card-img-top"
                    alt="Vehicle"
                  />

                  <div className="models-div__box__descr">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__name">
                        <p>{veh.name}</p>
                        <p>{veh.name}</p>

                        <span>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </span>
                      </div>
                      <div className="models-div__box__descr__name-price__price">
                        <h4>Rs{veh.rent_per_day}</h4>
                        <p>per day</p>
                      </div>
                    </div>
                    <div className="models-div__box__descr__name-price__details">
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp;{' '}
                        {veh.brand}
                      </span>
                      <span style={{ textAlign: 'right' }}>
                        {veh.no_of_seat} &nbsp;Seat&nbsp;
                        <i className="fa-solid fa-car-side"></i>
                      </span>
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp;{' '}
                        {veh.type}
                      </span>
                      <span style={{ textAlign: 'right' }}>
                        {veh.fuel_type} &nbsp;{' '}
                        <i className="fa-solid fa-car-side"></i>
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__btn">
                      <Link to={`/product/${veh.id}`}>
                        <h1>Book Ride</h1>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </div>
      </Row>
    </section>
  );
}

export default FrequentlyRentedCars;
