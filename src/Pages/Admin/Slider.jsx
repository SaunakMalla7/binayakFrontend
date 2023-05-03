import React, { useState } from 'react';

const Slider = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="logo-details">
          {/* <i className="bx bxl-c-plus-plus"></i> */}
          <span className="logo_name">Admin Dashboard</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/dashboard">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Profile </span>
            </a>
          </li>
          <li>
            <a href="/vehiclelist">
              <i className="bx bx-box"></i>
              <span className="links_name">Vehicle List</span>
            </a>
          </li>
          <li>
            <a href="/addadmin">
              <i className="bx bx-list-ul"></i>
              <span className="links_name">Add Admin</span>
            </a>
          </li>
          <li>
            <a href="/AddCustomer">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Add Customer</span>
            </a>
          </li>
          <li>
            <a href="/AddStaff">
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Add Staff</span>
            </a>
          </li>
          <li>
            <a href="/ViewAllUsers">
              <i className="bx bx-book-alt"></i>
              <span className="links_name">View All Users</span>
            </a>
          </li>
          <li>
            <a href="/InactiveUser">
              <i className="bx bx-message"></i>
              <span className="links_name">Inactive User</span>
            </a>
          </li>
          <li>
            <a href="/ActiveUsers">
              <i className="bx bx-heart"></i>
              <span className="links_name">Active Users</span>
            </a>
          </li>
          <li>
            <a href="/RentList">
              <i className="bx bx-heart"></i>
              <span className="links_name">Rent List</span>
            </a>
          </li>
          <li>
            <a href="/AddOffer">
              <i className="bx bx-heart"></i>
              <span className="links_name">Add Offer</span>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
          </li>
          <li className="log_out">
            <a href="#">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div>
      <button className="sidebarBtn" onClick={toggleSidebar}>
        <i
          className={`bx ${sidebarActive ? 'bx-menu-alt-right' : 'bx-menu'}`}
        ></i>
      </button>
    </>
  );
};

export default Slider;
