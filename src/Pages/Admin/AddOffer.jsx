import React, { useState } from 'react';
import axios from 'axios';
import Slider from './Slider';

const AddOffer = () => {
  const [offerTitle, setOfferTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [offerDuration, setOfferDuration] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost:7050/offers/publish-offer',
        {
          offerTitle,
          description,
          startDate,
          discountPercent,
          offerDuration,
        }
      );
      console.log(response.data);
      window.alert('Offer has been published successfully!');
      setOfferTitle('');
      setDescription('');
      setStartDate('');
      setDiscountPercent(0);
      setOfferDuration(0);
    } catch (error) {
      console.log(error);
      window.alert('Failed to publish offer. Please try again later.');
    }
  };

  return (
    <>
      <Slider />
      <section className="home-section c mt-4">
        <h1>Add Offer</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="offerTitle">Offer Title:</label>
            <input
              type="text"
              className="form-control"
              id="offerTitle"
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discountPercent">Discount Percent:</label>
            <input
              type="number"
              className="form-control"
              id="discountPercent"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="offerDuration">Offer Duration:</label>
            <input
              type="number"
              className="form-control"
              id="offerDuration"
              value={offerDuration}
              onChange={(e) => setOfferDuration(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Publish Offer
          </button>
        </form>
      </section>
    </>
  );
};

export default AddOffer;
