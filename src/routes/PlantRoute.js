import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./../components/Header/Header";

const PlantRoute = props => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = props.isLoggedIn;
  const plantRegister = props.plantRegister;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn && plantRegister ? (
          <>
            <Header />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/profile" />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn, plantRegister: state.plantRegister };
};

export default connect(mapStateToProps)(PlantRoute);
