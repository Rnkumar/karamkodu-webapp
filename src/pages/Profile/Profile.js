import React, { Component } from "react";
import "./Profile.css";
import one from "./../../images/profile/1.png";
import two from "./../../images/profile/2.png";
import three from "./../../images/profile/3.png";

class Profile extends Component {
  topElement() {
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

  check(name) {}

  environmentCard() {
    return (
      <>
        <br />
        <div class="card" className="cardstyle" onclick="check('environment')">
          <center>
            <img class="card-img-top" src={two} alt="Env logo" />
          </center>
          <div class="card-body">
            <center>
              <h5 class="card-title">
                <b>Environment</b>
              </h5>
            </center>
          </div>
        </div>
        <br />
        <button
          type="button"
          class="btn btn-dark"
          id="envbtn"
          className="btnstyle"
          data-toggle="modal"
          data-target="#env"
        >
          Register
        </button>
      </>
    );
  }

  educationCard() {
    return (
      <>
        <br />
        <div class="card" onclick="check('education')" className="cardstyle">
          <center>
            <img class="card-img-top" src={three} alt="Card image cap" />
          </center>
          <div class="card-body">
            <center>
              <h5 class="card-title">
                <b>Education</b>
              </h5>
            </center>
          </div>
        </div>
        <br />
        <a
          href="#"
          class="btn btn-dark mem_bt"
          id="edubtn1"
          data-toggle="modal"
          data-target="#edu_mem"
          style={{ display: "none" }}
        >
          Register as Member
        </a>
        <br />
        <br />
        <a
          href="#"
          class="btn btn-dark lead_bt"
          style={{ display: "none" }}
          id="edubtn2"
          data-toggle="modal"
          data-target="#edu_lead"
        >
          Register as Leader
        </a>
      </>
    );
  }

  rehabilitationCard() {
    return (
      <>
        <br />
        <div
          class="card"
          onclick="check('rehabilitation')"
          className="cardstyle"
        >
          <center>
            <img class="card-img-top" src={one} alt="Card image cap" />
          </center>
          <div class="card-body">
            <center>
              <h5 class="card-title">
                <b>Rehabilitation</b>
              </h5>
            </center>
          </div>
        </div>
        <br />
        <a
          href="#"
          class="btn btn-dark mem_bt"
          id="rehbtn1"
          style={{ display: "none" }}
          data-toggle="modal"
          data-target="#reh_mem"
        >
          Register as Member
        </a>
        <br />
        <br />
        <a
          href="#"
          class="btn btn-dark lead_bt"
          data-toggle="modal"
          id="rehbtn2"
          data-target="#reh_lead"
          style={{ display: "none" }}
        >
          Register as Leader
        </a>
      </>
    );
  }

  renderCard(name, id, image) {
    return (
      <>
        <br />
        <div
          class="card"
          onclick={this.check(name.toLowerCase())}
          className="cardstyle"
        >
          <center>
            <img class="card-img-top" src={image} alt={name + " logo"} />
          </center>
          <div class="card-body">
            <center>
              <h5 class="card-title">
                <b>{name}</b>
              </h5>
            </center>
          </div>
        </div>
        <br />
        <button
          type="button"
          class="btn btn-dark mem_bt"
          id={id + "btn1"}
          style={{ display: "none" }}
          data-toggle="modal"
          data-target={"#" + id + "_mem"}
        >
          Register as Member
        </button>
        <br />
        <br />
        <button
          class="btn btn-dark lead_bt"
          data-toggle="modal"
          id={id + "btn2"}
          data-target={"#" + id + "lead"}
          style={{ display: "none" }}
        >
          Register as Leader
        </button>
      </>
    );
  }

  render() {
    return (
      <div class="page-wrapper">
        <div class="container" style={{ color: "black" }}>
          {this.topElement()}
          <div class="row mob_row">
            <div class="col-md-4">{this.environmentCard()}</div>
            <div class="col-md-4">
              {this.renderCard("Education", "edu", three)}
            </div>
            <div class="col-md-4">
              {this.renderCard("Rehabilitation", "reh", one)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
