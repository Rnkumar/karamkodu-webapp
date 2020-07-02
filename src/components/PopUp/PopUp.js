import React, { Component } from "react";
import profileImage from "./../../images/profile/profile.png";
import { verifyUserId, joinTeamRequest } from "./../../backend/user";

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderId: "",
      centerName: "",
      isVisible: false,
      first_name: "",
      last_name: ""
    };
  }

  verifyUserId(leaderId) {
    leaderId = leaderId.replace("KK", "");
    verifyUserId(leaderId)
      .then(resp => {
        if (resp["message"] === "success") {
          this.setState({
            isVisible: true,
            first_name: resp["data"].first_name,
            last_name: resp["data"].last_name
          });
        } else {
          alert("No valid user found");
        }
      })
      .catch(err => {
        alert("Try Again");
        console.log(err);
      });
  }

  joinTeam(teamName, leaderId, centerName) {
    leaderId = leaderId.replace("KK", "");
    joinTeamRequest(teamName, leaderId, centerName, this.props.karamkoduId)
      .then(res => {
        if (res["message"] === "success") {
          alert("success");
          this.props.redirectToWait();
        } else {
          alert(res["message"]);
        }
      })
      .catch(err => {
        alert("Try Again Later");
        console.log(err);
      });
  }

  renderHeader(title) {
    return (
      <div className="modal-header">
        <h4 className="modal-title">{title}</h4>
      </div>
    );
  }

  renderFooter(id) {
    return (
      <div className="modal-footer">
        <button
          type="button"
          id={id}
          className="btn btn-dark"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>
    );
  }

  renderBody(profileKey, teamName, isLeaderRequest, info) {
    return (
      <div className="modal-body">
        <form>
          <div class="row" className="rowstyle">
            <div className="form-group">
              <label>Leader ID to Join</label>
              <input
                type="text"
                className="form-control"
                name="leader_id"
                placeholder="Enter Leader ID here"
                onChange={event =>
                  this.setState({ leaderId: event.target.value })
                }
              />
            </div>
            {isLeaderRequest && (
              <div class="form-group">
                <label>{info + " Name"}</label>
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="center_name"
                  placeholder={" Enter " + info + " Name here"}
                  onChange={event =>
                    this.setState({ centerName: event.target.value })
                  }
                />
              </div>
            )}
            <input
              type="button"
              onClick={() => this.verifyUserId(this.state.leaderId)}
              className="btn btn-dark"
              value="Verify"
            />
          </div>
          {this.state.isVisible && (
            <center className="profile">
              <div>
                <img
                  src={profileImage}
                  alt="profile"
                  style={{ width: "150px" }}
                />
                <h5>{this.state.first_name}</h5>
                <h5>{this.state.last_name}</h5>
                <input
                  type="button"
                  className="btn btn-dark"
                  value="Join"
                  onClick={() =>
                    this.joinTeam(
                      teamName,
                      this.state.leaderId,
                      this.state.centerName
                    )
                  }
                />
              </div>
            </center>
          )}
        </form>
      </div>
    );
  }

  render() {
    const {
      teamName,
      footerId,
      profileKey,
      id,
      info,
      isLeaderRequest
    } = this.props;
    return (
      <div id={id} className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content" style={{ color: "black" }}>
            {this.renderHeader(
              isLeaderRequest
                ? teamName + " - Register as Leader"
                : teamName + " - Register as Member"
            )}
            {this.renderBody(
              profileKey,
              teamName.toLowerCase(),
              isLeaderRequest,
              info
            )}
            {this.renderFooter(footerId)}
          </div>
        </div>
      </div>
    );
  }
}

PopUp.defaultProps = {
  isLeaderRequest: false,
  info: "none"
};
