import React, { Component } from "react";
import "./PlantRegistration.css";
import { registerPlant } from "./../../backend/plant";
import { connect } from "react-redux";
import { updatePlantStatus } from "../../actions";

class PlantRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      isLocationLoading: false,
      plantName: "",
      plantHeight: "",
      plantedDate: "",
      pincode: ""
    };
    this.successOnLocation = this.successOnLocation.bind(this);
    this.errorOnLocation = this.errorOnLocation.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  submitReport(event) {
    event.preventDefault();
    if (!this.validate(this.state)) {
      alert("Check the values you have entered");
      return;
    }
    registerPlant(this.props.karamkoduId, this.state)
      .then(resp => {
        updatePlantStatus(false);
        console.log(resp);
        this.props.updateEnvironmentFlag(true);
        this.props.history.push("/team/environment");
      })
      .catch(err => {
        if ("response" in err) {
          if (err.response.status === 409) {
            alert("You already have a plant registered!");
            return;
          }
        }
        alert("Try Again");
        console.log(err);
      });
  }

  validate({
    latitude,
    longitude,
    plantName,
    plantHeight,
    plantedDate,
    pincode
  }) {
    if (!latitude || latitude === "") {
      return false;
    }
    if (!longitude || longitude === "") {
      return false;
    }
    if (!plantName || plantName.trim().length === 0) {
      return false;
    }
    if (!plantHeight || plantHeight.trim().length === 0) {
      return false;
    }
    if (!plantedDate || plantedDate.trim().length === 0) {
      return false;
    }
    if (!pincode || pincode.trim().length === 0) {
      return false;
    }
    return true;
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser! Please Try Another Browser"
      );
    } else {
      this.setState({
        isLocationLoading: true
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
      latitude: latitude,
      longitude: longitude,
      isLocationLoading: false
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
              <form onSubmit={event => this.submitReport(event)}>
                <div class="row" className="rowstyle">
                  <div class="form-group">
                    <label>Plant Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter plant name here"
                      onChange={event =>
                        this.setState({ plantName: event.target.value })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label>Initial Plant Height (in feet)</label>
                    <br />
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Example:  2 ft"
                      onChange={event =>
                        this.setState({ plantHeight: event.target.value })
                      }
                    />
                  </div>
                  <div class="form_group">
                    <label>Select Planted date</label>
                    <br />
                    <input
                      type="date"
                      className="dateinput"
                      onChange={event =>
                        this.setState({ plantedDate: event.target.value })
                      }
                    />
                    <br />
                  </div>
                  <div class="form-group">
                    <label>Pincode</label>
                    <br />
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter pincode here"
                      onChange={event =>
                        this.setState({ pincode: event.target.value })
                      }
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
                        this.state.latitude === ""
                          ? "Capture My Location"
                          : `${this.state.latitude}, ${this.state.longitude}`
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

const mapStateToProps = state => {
  return { karamkoduId: state.karamkoduId };
};

function mapDispatchToProps(dispatch) {
  return {
    updatePlantStatus: status => dispatch(updatePlantStatus(status))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlantRegistration);
