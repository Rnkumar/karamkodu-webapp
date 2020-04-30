import React, { Component } from "react";
import "./Report.css";
import EducationReport from "./../../components/EducationReport/EducationReport";
import EnvironmentReport from "../../components/EnvironmentReport/EnvironmentReport";
import {Redirect } from "react-router-dom";


class Report extends Component {
  render() {
    const teamName = this.props.match.params.name;
    switch (teamName) {
      case "environment":
        return <EnvironmentReport />;
      case "education":
        return <EducationReport />;
      case "rehabilitation":
        return <Redirect to="/profile" />;
      default:
        return <Redirect to="/profile" />;
    }
  }
}

export default Report;
