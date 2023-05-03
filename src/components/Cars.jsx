import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CarImg1 from '../images/cars-big/audi-box.png';
import { Row } from 'react-bootstrap';

const Cars = (props) => {
  const { product } = props;
  let fuelTypeName = '';
  if (product.fuelType === 0) {
    fuelTypeName = 'Petrol';
  } else if (product.fuelType === 1) {
    fuelTypeName = 'Diesel';
  } else if (product.fuelType === 2) {
    fuelTypeName = 'Electric';
  }
  return (
    <section className="models-section" key={product.id}>
      <div className="container">
        <div className="models-div">
          <div className="models-div__box">
            <div className="models-div__box__img">
              {/* <img src={CarImg1} alt="car_img" /> */}
              <img
                src={`https://localhost:7050/vehicle/view-vehicle-image/${product.id}`}
                className="card-img-top"
                alt="Vehicle"
              />

              <div className="models-div__box__descr">
                <div className="models-div__box__descr__name-price">
                  <div className="models-div__box__descr__name-price__name">
                    <p>{product.name}</p>
                    <p>{product.brand}</p>

                    <span>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <div className="models-div__box__descr__name-price__price">
                    <h4>Rs{product.rentPerDay}</h4>
                    <p>per day</p>
                  </div>
                </div>
                <div className="models-div__box__descr__name-price__details">
                  <span>
                    <i className="fa-solid fa-car-side"></i> &nbsp;{' '}
                    {product.brand}
                  </span>
                  <span style={{ textAlign: 'right' }}>
                    {product.noOfSeat} &nbsp;Seat&nbsp;
                    <i className="fa-solid fa-car-side"></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-car-side"></i> &nbsp;{' '}
                    {product.type}
                  </span>
                  <span>
                    {fuelTypeName} &nbsp;
                    <i className="fa-solid fa-car-side"></i>
                  </span>
                </div>
                <div className="models-div__box__descr__name-price__btn">
                  <Link to={`/product/${product.id}`}>
                    <h1>Book Ride</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cars;
