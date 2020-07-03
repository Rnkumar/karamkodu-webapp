import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = props => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = props.isLoggedIn;
  return (
    <Route
      {...rest}
      render={childProps =>
        isLoggedIn ? <Component {...childProps} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn, karamkoduId: state.karamkoduId };
};

export default connect(mapStateToProps)(PrivateRoute);
