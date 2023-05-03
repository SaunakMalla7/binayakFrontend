import axios from 'axios';
import { useState } from 'react';
import Bill from './Bill.js';
import Navbar from '../components/Navbar.jsx';
import HeroPages from '../components/HeroPages.jsx';

function Payment() {
  const rentId = localStorage.getItem('returnid');
  const [paymentType, setPaymentType] = useState('0'); // default value for Cash
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  function handlePayment() {
    const apiUrl = `https://localhost:7050/rentalpayments/pay?requestId=${rentId}`;
    const paymentData = { paymentType, rentId };

    axios
      .post(apiUrl, paymentData)
      .then((response) => {
        console.log(response.data);
        setPaymentData(response.data);
        setIsPaymentSuccessful(true);
      })
      .catch((error) => {
        alert('Payment failed. Please try again later.');
        console.error(error);
      });
  }

  return (
    <>
      <section className="contact-page">
        <Navbar />
        <HeroPages name="Return Payment " />
        <div>
          {isPaymentSuccessful ? (
            <Bill paymentData={paymentData} />
          ) : (
            <div className="payment mt-3">
              <p>Pay the amount:</p>
              <div className="input-group mb-3">
                <select
                  className="form-select"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="0">Cash</option>
                  <option value="1">Digital</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay Now
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Payment;
