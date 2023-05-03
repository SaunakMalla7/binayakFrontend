// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function AvailableCars() {
//   const [frequentlyRentedCars, setFrequentlyRentedCars] = useState([]);

//   useEffect(() => {
//     async function fetchFrequentlyRentedCars() {
//       const response = await fetch(
//         'https://localhost:7050/rent/available-cars'
//       );
//       const data = await response.json();
//       setFrequentlyRentedCars(data);
//       console.log(data);
//     }
//     fetchFrequentlyRentedCars();
//   }, []);

//   return (
//     <div className="row row-cols-1 row-cols-md-3 g-4">
//       {frequentlyRentedCars.map((veh) => (
//         <div key={veh.id} className="col">
//           <div className="card h-100">
//             <img src={veh.image} className="card-img-top" alt="Vehicle" />
//             <div className="card-body">
//               <img
//                 src={`https://localhost:7050/vehicle/view-vehicle-image/${veh.id}`}
//                 className="card-img-top"
//                 alt="Vehicle"
//               />
//               <h5 className="card-title">{veh.name}</h5>
//               <p className="card-text">Rent Per Day: {veh.rentPerDay}</p>
//               <p className="card-text">Number Of Seats: {veh.noOfSeat}</p>
//               <p className="card-text">Fuel Type: {veh.fuelType}</p>
//             </div>
//             <div className="card-footer">
//               <Link
//                 to={{
//                   pathname: `/vehicle/${veh.id}/${veh.rent_per_day}`,
//                   search: `?id=${veh.id}&rentPerDay=${veh.rent_per_day}`,
//                 }}
//                 className="btn btn-primary"
//                 onClick={() => this.rentclick(veh.rent_per_day)}
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AvailableCars;
