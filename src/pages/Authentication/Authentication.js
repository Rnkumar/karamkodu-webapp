import React, { Component } from "react";
import "./Authentication.css";
import logo from "./../../images/logo_black.png";
import Login from "./../../components/Login/Login";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }

  navigateToProfile() {
    this.props.history.push("/");
  }

  componentDidMount() {
    document.title = "Auth";
  }

  render() {
    return (
      <div>
        <h2 className="title">LOGIN</h2>
        <center>
          <img src={logo} alt="karamkodu" />
        </center>
        <Login navigateToProfile={this.navigateToProfile} />
        <br />
        <br />
      </div>
    );
  }
}

export default Authentication;

// Not a member yet? <a href="index.html"> Register</a> <br />
// <br />
// <a href="index.html"> Forgot Password?</a>
