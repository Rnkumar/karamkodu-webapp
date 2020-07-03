import React, { Component } from "react";
import profileImage from "./../../images/profile/profile.png";
import {
  verifyUserId,
  joinTeamAsMemberRequest,
  joinTeamAsLeaderRequest
} from "./../../backend/user";

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderId: "",
      centerName: "",
      isVisible: false,
      name: ""
    };
    this.buttonRef = React.createRef();
  }

  verifyUserId(leaderId, teamName) {
    verifyUserId(leaderId, teamName)
      .then(resp => {
        console.log(resp);
        const response = resp.data;
        if (response["message"] === "success") {
          this.setState({
            isVisible: true,
            name: response["data"].name
          });
        } else {
          alert("No valid user found");
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          alert(err.response.data.message);
        } else {
          alert("Try Again");
        }
      });
  }

  async joinTeam(teamName, leaderId, centerName, isLeaderRequest) {
    try {
      let response = "";
      if (isLeaderRequest) {
        response = await joinTeamAsLeaderRequest(
          teamName,
          leaderId,
          centerName,
          this.props.karamkoduId
        );
      } else {
        response = await joinTeamAsMemberRequest(
          teamName,
          leaderId,
          this.props.karamkoduId
        );
      }
      if (response.status === 201) {
        alert("success");
        this.buttonRef.click();
        this.props.redirectToWait();
      } else {
        alert(response.data["message"]);
      }
    } catch (err) {
      console.log(err);

      if (err.response && err.response.status === 404) {
        alert("Volunteer not found");
      } else {
        alert("Try Again Later");
      }
    }
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
          ref={input => (this.buttonRef = input)}
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
              onClick={() => this.verifyUserId(this.state.leaderId, teamName)}
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
                <h5>{this.state.name}</h5>
                <input
                  type="button"
                  className="btn btn-dark"
                  value="Join"
                  onClick={() =>
                    this.joinTeam(
                      teamName,
                      this.state.leaderId,
                      this.state.centerName,
                      isLeaderRequest
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
      <div id={id} className="modal" role="dialog">
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
