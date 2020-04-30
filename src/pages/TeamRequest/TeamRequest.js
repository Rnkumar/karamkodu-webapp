import React, { Component } from "react";
import "./TeamRequest.css";
import profileImage from "./../../images/profile/profile.png";
import phoneImage from "./../../images/profile/phone.png";
import { connect } from "react-redux";

class TeamRequest extends Component {
  renderMember(userName, contactNumber, memberId) {
    return (
      <li class="list-group-item">
        {this.renderNameAndId(userName, memberId)}
        {this.renderContactNumber(contactNumber)}
        {this.renderOptions()}
      </li>
    );
  }

  submitResponse(){
      
  }

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
        <img src={profileImage} style={{ width: 40, height: 40 }} alt="profile"/>
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
    const teamName = this.props.match.params.name;
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
                {this.renderMember("A", 239849234, 2)}
                {this.renderMember("A", 239849234, 2)}
                {this.renderMember("A", 239849234, 2)}
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
  return { userId: state.userId };
}

export default connect(mapStateToProps)(TeamRequest);
