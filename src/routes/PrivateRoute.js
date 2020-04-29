import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = props.isLoggedIn;
  return (
    <Route
      {...rest}
      render={(props) => 
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return { isLoggedIn: state.isLoggedIn };
};

export default connect(mapStateToProps)(PrivateRoute);