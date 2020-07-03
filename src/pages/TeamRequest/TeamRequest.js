import React, { Component } from "react";
import "./TeamRequest.css";
import profileImage from "./../../images/profile/profile.png";
import phoneImage from "./../../images/profile/phone.png";
import { connect } from "react-redux";
import { getTeamRequests } from "./../../backend/team";

class TeamRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { teamRequests: [], isLoading: false };
  }
  renderMember(id, userName, contactNumber, memberId) {
    return (
      <li class="list-group-item" key={id}>
        {this.renderNameAndId(userName, memberId)}
        {this.renderContactNumber(contactNumber)}
        {this.renderOptions()}
      </li>
    );
  }

  componentDidMount() {
    const teamName = this.props.match.params.name;
    const karamkoduId = this.props.karamkoduId;
    getTeamRequests(karamkoduId, teamName)
      .then(resp => {
        this.setState({ teamRequests: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitResponse() {}

  renderContactNumber(contactNumber) {
    return (
      <span>
        <img
          src={phoneImage}
          style={{ width: 30, height: 30, marginRight: 10 }}
          alt="phone"
        />
        <span>{contactNumber}</span>
      </span>
    );
  }

  renderNameAndId(userName, memberId) {
    return (
      <span style={{ float: "left" }}>
        <img
          src={profileImage}
          style={{ width: 40, height: 40 }}
          alt="profile"
        />
        <span>{userName}</span>
        <span class="badge">({"KK" + memberId})</span>
      </span>
    );
  }

  renderOptions() {
    return (
      <span style={{ float: "right" }}>
        <button
          style={{ marginRight: 10, marginLeft: 10 }}
          class="btn btn-dark"
        >
          Accept
        </button>
        <button
          style={{ marginRight: 10, marginLeft: 10 }}
          class="btn btn-dark"
        >
          Reject
        </button>
      </span>
    );
  }

  render() {
    return (
      <div class="page-wrapper">
        <div class="container">
          <center>
            <h3 className="title">Requests</h3>
          </center>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <ul class="list-group">
                {this.state.teamRequests.length === 0 ? (
                  <center>
                    <p>No Requests Yet!</p>
                  </center>
                ) : (
                  this.state.teamRequests.map((item, id) => {
                    return this.renderMember(
                      id,
                      item.name,
                      item.contact_number,
                      item.member_id
                    );
                  })
                )}
              </ul>
              <br />
              <center>
                <button
                  className="buttonStyle"
                  onClick={() => this.props.history.goBack()}
                >
                  Back to My Team
                </button>
              </center>
            </div>
            <div class="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { karamkoduId: state.karamkoduId };
}

export default connect(mapStateToProps)(TeamRequest);
