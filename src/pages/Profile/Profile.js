import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";

import rehabilitationImage from "./../../images/profile/1.png";
import environmentImage from "./../../images/profile/2.png";
import educationImage from "./../../images/profile/3.png";
import PopUp from "./../../components/PopUp/PopUp";
import popUpData from "./data";
import { getProfile } from "./../../backend/user";
import { getTeamMemberStatus } from "./../../backend/team";
import { getPlant } from "./../../backend/plant";
import {
  updatePlantStatus,
  updateEnvironmentFlag,
  updateRehabilitationFlag,
  updateEducationFlag,
  reset
} from "../../actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      environment: false,
      education: false,
      rehabilitation: false,
      environmentRegisterFlag: false,
      educationRegisterFlag: false,
      rehabilitationRegisterFlag: false,
      loading: false
    };
    this.parseResponse = this.parseResponse.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    const karamkoduId =
      "karamkodu_data" in localStorage
        ? (function() {
            let data = window.atob(localStorage.getItem("karamkodu_data"));
            if (data) {
              const dataSplit = data.split(":");
              if (dataSplit.length === 2) {
                return dataSplit[1];
              } else {
                return -1;
              }
            } else {
              return -1;
            }
          })()
        : -1;
    getProfile(karamkoduId)
      .then(resp => {
        const response = this.parseResponse(resp.data);
        this.setState({ ...response });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  parseResponse(data) {
    let { environment, education, rehabilitation, name } = data;
    environment = environment === 1 ? true : false;
    education = education === 1 ? true : false;
    rehabilitation = rehabilitation === 1 ? true : false;
    return { environment, education, rehabilitation, name };
  }

  renderTitle() {
    return (
      <center>
        <div>
          <h3 className="topic">Profile</h3>
          {this.state.loading && (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
          <br />
          <h5>
            Hi, Welcome back <span>{this.state.name}</span>
          </h5>
          <br />
          <br />
        </div>
      </center>
    );
  }

  processStyleForBtn(name, styleName) {
    name = name.toLowerCase();
    let fields = this.state;
    return fields[name] ? styleName : "btnstyle";
  }

  logout = () => {
    this.props.reset();
    localStorage.clear();
    this.props.history.push("/login");
  };

  renderButton(dataTargetId, name, text) {
    return (
      <button
        type="button"
        className={this.processStyleForBtn(name, "btn btn-dark mem_bt")}
        style={{ margin: 10 }}
        data-toggle="modal"
        data-target={dataTargetId}
      >
        {text}
      </button>
    );
  }

  async validateStatus(name) {
    name = name.toLowerCase();
    if (this.state[name + "RegisterFlag"]) return;
    this.setState({ loading: true });
    let status = await this.validateFromServer(name);
    this.setState({ loading: false });
    switch (status) {
      case "PENDING":
        this.props.history.push("/waiting-for-approval");
        break;
      case "APPROVED":
        if (name === "environment") {
          this.setState({ loading: true });
          let plantFlag = await this.validatePlant();
          this.setState({ loading: false });
          if (plantFlag === "ABSENT") {
            this.props.updatePlantStatus(true);
            this.props.history.push("/plant");
          } else if (plantFlag === "PRESENT") {
            this.props.updateEnvironmentFlag(true);
            this.props.history.push("/team/" + name);
          } else {
            alert("TRY AGAIN");
          }
        } else if (name === "education") {
          this.props.updateEducationFlag(true);
          this.props.history.push("/team/" + name);
        } else if (name === "rehabilitation") {
          this.props.updateRehabilitationFlag(true);
          this.props.history.push("/team/" + name);
        }
        break;
      case "REJECTED":
        alert("Sorry your access is rejected!");
      default:
        let key = name + "RegisterFlag";
        this.setState({
          [key]: true
        });
        break;
    }
  }

  validateFromServer = async teamName => {
    const response = await getTeamMemberStatus(
      this.props.karamkoduId,
      teamName
    );
    return response.data.status;
  };

  validatePlant = async () => {
    try {
      const response = await getPlant(this.props.karamkoduId);
      if (!response) return "NOT";
      return "PRESENT";
    } catch (err) {
      if ("response" in err) {
        if ("status" in err.response) {
          if (err.response.status === 404) {
            return "ABSENT";
          }
        }
      }
      return "NOT";
    }
  };

  renderCard(name, id, image, registerFlag) {
    return (
      <div
        class="card"
        className="cardstyle"
        onClick={event => this.validateStatus(name)}
      >
        <center>
          <img className="card-img-top" src={image} alt={name + " logo"} />
        </center>
        <div className="card-body">
          <center>
            <h5 className="card-title">
              <b>{name}</b>
            </h5>
          </center>
        </div>
        {registerFlag &&
          (name.toLowerCase() === "environment" ? (
            this.renderButton("#env", name, "Register")
          ) : (
            <>
              {this.renderButton("#" + id + "_mem", name, "Register as Member")}
              <br />
              <br />
              {this.renderButton(
                "#" + id + "_lead",
                name,
                "Register as Leader"
              )}
            </>
          ))}
      </div>
    );
  }

  renderCards(education, environment, rehabilitation) {
    let dataObject = [];

    if (education) {
      dataObject.push([
        "Education",
        "edu",
        educationImage,
        this.state.educationRegisterFlag
      ]);
    }

    if (environment) {
      dataObject.push([
        "Environment",
        "env",
        environmentImage,
        this.state.environmentRegisterFlag
      ]);
    }

    if (rehabilitation) {
      dataObject.push([
        "Rehabilitation",
        "reh",
        rehabilitationImage,
        this.state.rehabilitationRegisterFlag
      ]);
    }

    let size = 12 / dataObject.length;

    return dataObject.map((item, id) => (
      <div
        key={id}
        className={"col-md-" + size + " d-flex justify-content-center"}
      >
        {this.renderCard(item[0], item[1], item[2], item[3])}
      </div>
    ));
  }

  filterPopUp(education, environment, rehabilitation) {
    let filteredPopUpData = [];
    if (environment) {
      filteredPopUpData.push(popUpData[0]);
    }
    if (education) {
      filteredPopUpData.push(popUpData[1]);
      filteredPopUpData.push(popUpData[2]);
    }
    if (rehabilitation) {
      filteredPopUpData.push(popUpData[3]);
      filteredPopUpData.push(popUpData[4]);
    }
    return filteredPopUpData;
  }

  render() {
    const { environment, education, rehabilitation } = this.state;
    const filteredPopUpData = this.filterPopUp(
      education,
      environment,
      rehabilitation
    );

    return (
      <div className="page-wrapper">
        <div className="container" style={{ color: "black" }}>
          {this.renderTitle()}
          <div className="row mob_row">
            {this.renderCards(education, environment, rehabilitation)}
          </div>
        </div>
        {filteredPopUpData.map((item, id) => (
          <PopUp
            key={id}
            id={item.id}
            karamkoduId={this.props.karamkoduId}
            teamName={item.teamName}
            profileKey={item.profileKey}
            footerId={item.footerId}
            isLeaderRequest={item.isLeaderRequest}
            info={item.info}
            redirectToWait={() => {
              this.props.history.push("waiting-for-approval");
            }}
          />
        ))}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updatePlantStatus: status => dispatch(updatePlantStatus(status)),
    updateEnvironmentFlag: flag => dispatch(updateEnvironmentFlag(flag)),
    updateEducationFlag: flag => dispatch(updateEducationFlag(flag)),
    updateRehabilitationFlag: flag => dispatch(updateRehabilitationFlag(flag)),
    reset: () => dispatch(reset())
  };
}
function mapStateToProps(state) {
  return { karamkoduId: state.karamkoduId };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
