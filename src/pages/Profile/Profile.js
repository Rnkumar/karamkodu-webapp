import React, { Component } from "react";
import "./Profile.css";
import rehabilitationImage from "./../../images/profile/1.png";
import environmentImage from "./../../images/profile/2.png";
import educationImage from "./../../images/profile/3.png";
import PopUp from "./../../components/PopUp/PopUp";
import popUpData from "./data";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environment: true,
      education: true,
      rehabilitation: true,
      environmentRegisterFlag: false,
      educationRegisterFlag: false,
      rehabilitationRegisterFlag: false,
    };
  }

  renderTitle() {
    return (
      <center>
        <h3 className="topic">Profile</h3>
        <br />
        <h5>
          Hi, Welcome back <span>Bala</span> <span>Kumaran</span>
        </h5>
        <br />
        <br />
      </center>
    );
  }

  processStyleForBtn(name, styleName) {
    name = name.toLowerCase();
    let fields = this.state;
    return fields[name] ? styleName : "btnstyle";
  }

  check(name) {}

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

  validateStatus(name) {
    name = name.toLowerCase();
    let status = "APPROVED";
    switch (status) {
      case "PENDING":
        this.props.history.push("/waiting-for-approval");
        break;
      case "APPROVED":
        if (name === "environment") {
          let plantFlag = "PRESENT";
          if (plantFlag === "ABSENT") {
            this.props.history.push("/plant");
          } else {
            this.props.history.push("/team/"+name);
          }
        } else {
          this.props.history.push("/team");
        }
        break;
      case "NOT_EXISTING":
      default:
        let key = name + "RegisterFlag";
        this.setState({
          [key]: true,
        });
        break;
    }
  }

  renderCard(name, id, image, registerFlag) {
    return (
      <button type="button" onClick={(event) => this.validateStatus(name)}>
        <br />
        <div
          class="card"
          onClick={this.check(name.toLowerCase())}
          className="cardstyle"
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
      </button>
    );
  }

  renderCards(education, environment, rehabilitation) {
    let dataObject = [];

    if (education) {
      dataObject.push([
        "Education",
        "edu",
        educationImage,
        this.state.educationRegisterFlag,
      ]);
    }

    if (environment) {
      dataObject.push([
        "Environment",
        "env",
        environmentImage,
        this.state.environmentRegisterFlag,
      ]);
    }

    if (rehabilitation) {
      dataObject.push([
        "Rehabilitation",
        "reh",
        rehabilitationImage,
        this.state.rehabilitationRegisterFlag,
      ]);
    }

    let size = 12 / dataObject.length;

    return dataObject.map((item, id) => (
      <div key={id} className={"col-md-" + size}>
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

export default Profile;
