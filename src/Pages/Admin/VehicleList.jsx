import React, { Component } from 'react';
import { variables } from '../../variables';
import Slider from './Slider';
import { Link } from 'react-router-dom';

class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      id: '',
      modaltitle: '',
      name: '',
      vehicle_no: '',
      type: '',
      brand: '',
      rent_per_day: 0,
      no_of_seat: 0,
      fuel_type: '',
      showModal: false,
      description: '',
    };
  }
  resetFields = () => {
    this.setState({
      modaltitle: '',
      name: '',
      vehicle_no: '',
      type: '',
      brand: '',
      rent_per_day: 0,
      no_of_seat: 0,
      fuel_type: '',
      description: '',
    });
  };

  refreshList() {
    fetch(variables.vehicle + 'view-vehicles')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ vehicles: data });
      });
  }
  changename = (e) => {
    this.setState({ name: e.target.value });
  };
  changebrand = (e) => {
    this.setState({ brand: e.target.value });
  };
  changefuel = (e) => {
    this.setState({ fuel_type: e.target.value });
  };
  changenumber = (e) => {
    this.setState({ vehicle_no: e.target.value });
  };
  changerent = (e) => {
    this.setState({ rent_per_day: e.target.value });
  };
  changeseat = (e) => {
    this.setState({ no_of_seat: e.target.value });
  };
  changetype = (e) => {
    this.setState({ type: e.target.value });
  };
  changedescription = (e) => {
    this.setState({ description: e.target.value });
  };
  componentDidMount() {
    this.refreshList();
  }

  deleteClick(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      fetch(variables.vehicle + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert('Failed');
          }
        );
    }
  }

  //
  editVehicle = (vehicle) => {
    this.setState({
      modaltitle: 'Edit Vehicle',
      id: vehicle.id,
      name: this.state.name,
      vehicleNo: this.state.vehicle_no,
      type: this.state.type,
      brand: this.state.brand,
      rentPerDay: this.state.rent_per_day,
      noOfSeat: this.state.no_of_seat,
      fuelType: this.state.fuel_type,
      description: this.state.description,
    });
  };

  addClick() {
    this.setState({
      modaltitle: 'Add Vehicle',
      id: null,
    });
  }

  updateClick() {
    const { id } = this.state;
    const confirmed = window.confirm(
      'Are you sure you want to update this vehicle?'
    );
    if (confirmed) {
      fetch('https://localhost:7050/vehicle/update-vehicle-' + id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          vehicleNo: this.state.vehicle_no,
          type: this.state.type,
          brand: this.state.brand,
          rentPerDay: this.state.rent_per_day,
          noOfSeat: this.state.no_of_seat,
          fuelType: this.state.fuel_type,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert('Successfully Updated');
            this.refreshList();
          },
          (error) => {
            alert('Failed');
          }
        );
      this.resetFields();
    }
  }

  createClick() {
    if (
      !this.state.name ||
      !this.state.vehicle_no ||
      !this.state.type ||
      !this.state.fuel_type ||
      !this.state.no_of_seat ||
      !this.state.rent_per_day ||
      !this.state.brand
    ) {
      alert('Please fill in all fields.');
      return;
    }
    const confirmed = window.confirm(
      'Are you sure you want to create this vehicle?'
    );
    if (confirmed) {
      fetch('https://localhost:7050/vehicle/add-vehicles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          vehicleNo: this.state.vehicle_no,
          type: this.state.type,
          brand: this.state.brand,
          rentPerDay: this.state.rent_per_day,
          noOfSeat: this.state.no_of_seat,
          fuelType: this.state.fuel_type,
          description: this.state.description,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert('Successfully Created');
            this.refreshList();
          },
          (error) => {
            alert('Failed');
          }
        );
      this.resetFields();
    }
  }

  render() {
    const {
      vehicles,
      modaltitle,
      name,
      vehicle_no,
      type,
      brand,
      rent_per_day,
      no_of_seat,
      fuel_type,
      id,
      description,
    } = this.state;

    return (
      <div>
        <Slider />
        <section class="home-section">
          <h1>Rent Vehicle</h1>
          <button
            type="button"
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => this.addClick()}
          >
            Add vehicles
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
                <th>Vehicle Brand</th>
                <th>Rent Per Day</th>
                <th>Number Of Seats</th>
                <th>Fuel Type</th>
                <th>Description</th>
                <th>Options</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.rentPerDay}</td>
                  <td>{vehicle.noOfSeat}</td>
                  <td>{vehicle.fuelType}</td>
                  <td>{vehicle.description}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => this.editVehicle(vehicle)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => this.deleteClick(vehicle.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/upload-image`}
                      onClick={window.localStorage.setItem(
                        'vehicleid',
                        vehicle.id
                      )}
                    >
                      <button className="btn btn-primary">Upload Image</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modaltitle}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="input-group mb-3 ">
                    <span className="input-group-text">Vehicle Name</span>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={this.changename}
                    />
                  </div>

                  <div className="input-group mb-3 ">
                    <span className="input-group-text">Vehicle Number</span>
                    <input
                      type="text"
                      className="form-control"
                      value={vehicle_no}
                      onChange={this.changenumber}
                    />
                  </div>

                  <div className="input-group mb-3 ">
                    <span className="input-group-text">type</span>
                    <input
                      type="text"
                      className="form-control"
                      value={type}
                      onChange={this.changetype}
                    />
                  </div>

                  <div className="input-group mb-3 ">
                    <span className="input-group-text">fuel_type</span>
                    <input
                      type="text"
                      className="form-control"
                      value={fuel_type}
                      onChange={this.changefuel}
                    />
                  </div>
                  <div className="input-group mb-3 ">
                    <span className="input-group-text">Description</span>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={this.changedescription}
                    />
                  </div>

                  <div className="input-group mb-3 ">
                    <span className="input-group-text">no_of_seat</span>
                    <input
                      type="text"
                      className="form-control"
                      value={no_of_seat}
                      onChange={this.changeseat}
                    />
                  </div>

                  <div className="input-group mb-3 ">
                    <span className="input-group-text">rent_per_day</span>
                    <input
                      type="text"
                      className="form-control"
                      value={rent_per_day}
                      onChange={this.changerent}
                    />
                  </div>

                  <div className="input-group mb-3 ">
                    <span className="input-group-text"> brand</span>
                    <input
                      type="text"
                      className="form-control"
                      value={brand}
                      onChange={this.changebrand}
                    />
                  </div>

                  {id == null ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.createClick()}
                    >
                      Create
                    </button>
                  ) : null}

                  {id !== null ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.updateClick(id)}
                    >
                      Edit
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default VehicleList;
