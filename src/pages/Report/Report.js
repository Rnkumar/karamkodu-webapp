import React, { Component } from "react";
import "./Report.css";
import EducationReport from "./../../components/EducationReport/EducationReport";
import EnvironmentReport from "../../components/EnvironmentReport/EnvironmentReport";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Report extends Component {
  goBack = () => this.props.history.goBack();
  render() {
    const teamName = this.props.match.params.name;
    switch (teamName) {
      case "environment":
        return (
          <EnvironmentReport
            goBack={this.goBack}
            karamkoduId={this.props.karamkoduId}
          />
        );
      case "education":
        return (
          <EducationReport
            karamkoduId={this.props.karamkoduId}
            goBack={this.goBack}
          />
        );
      case "rehabilitation":
        return <Redirect to="/profile" />;
      default:
        return <Redirect to="/profile" />;
    }
  }
}
const mapStateToProps = state => {
  return { karamkoduId: state.karamkoduId };
};
export default connect(mapStateToProps)(Report);
