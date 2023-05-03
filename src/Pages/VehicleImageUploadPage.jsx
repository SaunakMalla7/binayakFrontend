import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from './Admin/Slider';

function ImageUpload(props) {
  const vehicleid = localStorage.getItem('vehicleid');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post(
        `https://localhost:7050/vehicle/upload-vehicle-image?vehicleId=${vehicleid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        alert('Image Added Successfully');
        window.location.href = `/vehiclelist`;
      })
      .catch((error) => {
        console.log('Error uploading license:', error);
        setIsLoading(false);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Slider />
      <section class="home-section">
        <h1>Upload Vehicle Image</h1>
        <br />
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Select a file:
                </label>
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default ImageUpload;
