import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = props.isLoggedIn;
  return (
    <Route
      {...rest}
      render={(props) => 
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/profile" />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn };
};

export default connect(mapStateToProps)(AuthRoute);
