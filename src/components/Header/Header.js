import React from "react";
import { connect } from "react-redux";
import { reset } from "../../actions";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "./../../images/logo_black.png";

const Header = props => {
  const logout = () => {
    props.reset();
    localStorage.clear();
    props.history.push("/login");
  };

  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="navbar-brand">
        <img
          src={logo}
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="http://karamkodu.in">
          <span style={{ color: "white" }}>Home</span>
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/">
          <span style={{ color: "white" }}>Profile</span>
        </Link>
      </div>
      <span class="navbar-brand pull-right">
        <button type="button" class="btn btn-light" onClick={() => logout()}>
          Log out
        </button>
      </span>
    </nav>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch(reset())
  };
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
