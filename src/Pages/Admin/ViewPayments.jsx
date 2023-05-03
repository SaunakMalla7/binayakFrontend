import React, { useState, useEffect } from 'react';

function RentalPayments() {
  const [payments, setPayments] = useState([]);
  const paymentTypes = {
    0: 'Cash',
    1: 'Digital'
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://localhost:7050/rentalpayments/view-all');
      const data = await response.json();
      setPayments(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Rental Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Type</th>
            <th>Payment Date</th>
            <th>Total Amount</th>
            <th>Rent ID</th>
            <th>Is Paid</th>
          </tr>
        </thead>
        <tbody>
        {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{paymentTypes[payment.paymentType]}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.totalAmount}</td>
              <td>{payment.rentId}</td>
              <td>{payment.isPaid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RentalPayments;
