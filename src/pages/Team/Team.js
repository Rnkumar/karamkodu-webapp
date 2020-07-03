import React, { Component } from "react";
import "./Team.css";
import profileImage from "./../../images/profile/profile.png";
import phoneImage from "./../../images/profile/phone.png";
import { getTeamMembers } from "./../../backend/team";
import { connect } from "react-redux";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      loading: false,
      noTeamFlag: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const teamName = this.props.match.params.name;
    const karamkoduId = this.props.karamkoduId;
    getTeamMembers(karamkoduId, teamName)
      .then(response => {
        this.setState({ noTeamFlag: true, teamMembers: response.data });
      })
      .catch(err => {
        if (err.response.status === 404) {
          if (err.response.data.message === "team not found") {
            this.setState({ noTeamFlag: true });
          }
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

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
        <span style={{ marginTop: "5px" }}>{item.contact_number}</span>
        <span class="badge" style={{ float: "right" }}>
          {"KK" + item.member_id}
        </span>
      </li>
    ));
  }

  render() {
    const teamName = this.props.match.params.name;
    return (
      <div>
        <center>
          <h3 className="title">MY TEAM</h3>
          <br />
        </center>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            {this.state.loading && (
              <center id="statustext">
                <p>Loading!!</p>
              </center>
            )}
            {this.state.teamMembers.length === 0 && (
              <center>
                <p>No Team Members Yet!</p>
              </center>
            )}
            <ul class="list-group" id="teamlist">
              {this.renderTeam()}
            </ul>
            <br />
            <center>
              <button
                type="button"
                onClick={() => this.props.history.push("/request/" + teamName)}
                class="btn btn-dark"
              >
                View Requests
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                onClick={() => this.props.history.push("/report/" + teamName)}
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

const mapStateToProps = state => {
  return { karamkoduId: state.karamkoduId };
};

export default connect(mapStateToProps)(Team);
