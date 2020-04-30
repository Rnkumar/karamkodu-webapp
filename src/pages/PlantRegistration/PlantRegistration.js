import React, { Component } from "react";
import "./PlantRegistration.css";

class PlantRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantLocation: "",
      isLocationLoading: false,
      plantName: "",
      plantHeight: "",
      plantedDate: "",
      pincode: "",
    };
    this.successOnLocation = this.successOnLocation.bind(this);
    this.errorOnLocation = this.errorOnLocation.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  submitReport(event) {
    event.preventDefault();
    console.log(this.state);
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser! Please Try Another Browser"
      );
    } else {
      this.setState({
        isLocationLoading: true,
      });
      navigator.geolocation.getCurrentPosition(
        this.successOnLocation,
        this.errorOnLocation
      );
    }
  }

  successOnLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.setState({
      plantLocation: latitude + "," + longitude,
      isLocationLoading: false,
    });
  }

  errorOnLocation() {
    this.setState({ isLocationLoading: false });
    alert(
      "Unable to retrieve your location! Try Again By enabling location access"
    );
  }

  render() {
    return (
      <div class="page-wrapper">
        <div class="container" style={{ color: "black" }}>
          <center>
            <h3 className="title">Plant Registration</h3>
            <br />
          </center>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <form onSubmit={(event) => this.submitReport(event)}>
                <div class="row" className="rowstyle">
                  <div class="form-group">
                    <label>Plant Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter plant name here"
                      onChange={(event)=>this.setState({plantName: event.target.value})}
                    />
                  </div>
                  <div class="form-group">
                    <label>Initial Plant Height</label>
                    <br />
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter plant height here(in feet)"
                      onChange={(event)=>this.setState({plantHeight: event.target.value})}
                    />
                  </div>
                  <div class="form_group">
                    <label>Select Planted date</label>
                    <br />
                    <input type="date" className="dateinput" onChange={(event)=>this.setState({plantedDate: event.target.value})}/>
                    <br />
                  </div>
                  <div class="form-group">
                    <label>Pincode</label>
                    <br />
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter pincode here"
                      onChange={(event)=>this.setState({pincode: event.target.value})}
                    />
                  </div>
                  <div class="form-group">
                    <label>Current Location</label>
                    <br />
                    <input
                      type="button"
                      class="form-control"
                      onClick={() => this.getCurrentLocation()}
                      value={
                        this.state.plantLocation === ""
                          ? "Capture My Location"
                          : this.state.plantLocation
                      }
                    />
                  </div>

                  <br />
                  <input type="submit" class="btn btn-dark" value="Submit" />
                </div>
              </form>
            </div>
            <div class="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlantRegistration;
