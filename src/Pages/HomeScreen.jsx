import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';

import { Row, Col } from 'react-bootstrap';

import Navbar from '../components/Navbar';
import Car from '../components/Cars';
import Cars from '../components/Cars';
import FrequentlyRentedCars from './FrequentlyRentedCars';
import NotRentedCars from './NotRentedCars';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          'https://localhost:7050/rent/available-cars'
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container products">
        <h1 className="AvailableCars">
          Available &nbsp;
          <span>Cars</span>
        </h1>
        {loading ? (
          <>Loading...</>
        ) : error ? (
          <>{error}</>
        ) : (
          <Row>
            {products.map((product) => (
              <Col xs={10} md={6} lg={4} key={product.id} className="mb-3">
                <Cars product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
