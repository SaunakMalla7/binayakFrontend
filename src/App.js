import '../src/dist/styles.css';
import About from './Pages/About';
import Home from './Pages/Home';
import Navbar from '../src/components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Models from './Pages/Models';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import CarList from './Pages/CarList';
import CarsScreen from './Pages/CarsScreen';
import { useState } from 'react';
import LicenceUpload from './components/LicenceUpload';
import DashboardScreen from './Pages/Admin/DashboardScreen';
import VehicleList from './Pages/Admin/VehicleList';
import AddAdmin from './Pages/Admin/AddAdmin';
import AddCustomer from './Pages/Admin/AddCustomer';
import AddStaff from './Pages/Admin/AddStaff';
import ViewAllUsers from './Pages/Admin/ViewAllUsers';
import UserDetails from './Pages/Admin/UserDetails';
import ProfilePage from './Pages/Admin/ProfilePage';
import InactiveUser from './Pages/Admin/InactiveUser';
import ActiveUsers from './Pages/Admin/ActiveUsers';
import RentList from './Pages/Admin/RentList';
import RentDetails from './Pages/Admin/RentDetails';
import Profile from './Pages/Profile';
import UserRented from './Pages/UserRented';
import ChangePassword from './Pages/Admin/ChangePassword';
import AddOffer from './Pages/Admin/AddOffer';
import UserRentDetails from './Pages/UserRentDetail';
import Payment from './Pages/Payment';
import RentalPayments from './Pages/Admin/ViewPayments';
import ImageUpload from './Pages/VehicleImageUploadPage';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogout = () => {
  //   window.localStorage.clear(); // clear local storage
  //   setLoggedIn(false); // update loggedIn state value
  //   navigate('/login'); // redirect to login page
  // };
  return (
    <>
      {/* <Navbar /> */}
      {/* <Navigation loggedIn={loggedIn} handleLogout={handleLogout} /> */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="dashboard" element={<ProfilePage />} />
        <Route path="/product/:id" element={<CarsScreen />} />
        <Route path="/licence-upload" element={<LicenceUpload />} />
        <Route path="/vehiclelist" element={<VehicleList />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/AddCustomer" element={<AddCustomer />} />
        <Route path="/AddStaff" element={<AddStaff />} />
        <Route path="/ViewAllUsers" element={<ViewAllUsers />} />
        <Route path="/user-details/:id/:username" element={<UserDetails />} />
        <Route
          path="/ChangePassword/:id/:username"
          element={<ChangePassword />}
        />
        <Route path="/InactiveUser" element={<InactiveUser />} />
        <Route path="/ActiveUsers" element={<ActiveUsers />} />
        <Route path="/RentList" element={<RentList />} />
        <Route path="/rent/:id" element={<RentDetails />} />
        <Route path="/UserRented" element={<UserRented />} />
        <Route path="/AddOffer" element={<AddOffer />} />
        <Route path="/rents/:id" element={<UserRentDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/rental-payments" element={<RentalPayments />} />
        <Route path="/upload-image" element={<ImageUpload />} />
      </Routes>
    </>
  );
}

export default App;
