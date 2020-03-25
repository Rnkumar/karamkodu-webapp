import React, { Component } from "react";
import "./Team.css";
import profileImage from "./../../images/profile/profile.png";
import phoneImage from "./../../images/profile/phone.png";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [
        {
          name: "dlsjflsdf",
          mobile: "879843759834",
          id: 12
        }
      ]
    };
  }

  getUrl(type) {}

  renderTeam() {
    const team = this.state.teamMembers;
    return team.map((item, id) => (
      <li key={id} class="list-group-item">
        <img
          src={profileImage}
          style={{ width: "40px", float: "left", marginRight: "10px" }}
          alt="profile logo"
        />
        <span style={{ float: "left", marginTop: "5px" }}>{item.name}</span>
        <img
          src={phoneImage}
          style={{ width: "32px", marginRight: "10px" }}
          alt="phone logo"
        />
        <span style={{ marginTop: "5px" }}>{item.mobile}</span>
        <span class="badge" style={{ float: "right" }}>
          {"KK" + item.id}
        </span>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <center>
          <h3 className="title">MY TEAM</h3>
          <br />
        </center>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <center id="statustext">
              <p>Loading!!</p>
            </center>
            <ul class="list-group" id="teamlist">
              {this.renderTeam()}
            </ul>
            <br />
            <center>
              <button
                type="button"
                onClick={this.getUrl("request")}
                class="btn btn-dark"
              >
                View Requests
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                onClick={this.getUrl("report")}
                class="btn btn-dark"
              >
                Add Report
              </button>
            </center>
            <br />
            {/* <center>
              <p id="lastreportdate">No reports submitted yet</p>
            </center> */}
          </div>
          <div class="col-md-2"></div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Team;
