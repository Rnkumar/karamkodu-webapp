import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const TeamRoute = props => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = props.isLoggedIn;
  const teamFlag = props.teamFlag;
  return (
    <Route
      {...rest}
      render={properties => {
        const validTeamNames = ["environment", "education", "rehabilitation"];
        const teamName = properties.match.params.name.toLowerCase();
        if (!validTeamNames.includes(teamName)) {
          return <Redirect to="/profile" />;
        }
        const teamNameFlag = props[teamName + "Flag"];
        console.log();
        return isLoggedIn && teamNameFlag ? (
          <Component {...properties} />
        ) : (
          <Redirect to="/profile" />
        );
      }}
    />
  );
};

const mapStateToProps = state => {
  const {
    isLoggedIn,
    teamFlag,
    educationFlag,
    environmentFlag,
    rehabilitationFlag
  } = state;
  return {
    isLoggedIn: isLoggedIn,
    teamFlag: teamFlag,
    environmentFlag: environmentFlag,
    educationFlag: educationFlag,
    rehabilitationFlag: rehabilitationFlag
  };
};

export default connect(mapStateToProps)(TeamRoute);
