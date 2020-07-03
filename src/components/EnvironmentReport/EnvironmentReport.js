import React, { Component } from "react";
import "./EnvironmentReport.css";
import { submitEnvReport } from "./../../backend/report";
class EnvironmentReport extends Component {
  constructor(props) {
    super(props);
    this.initialState = { treeGuard: "", issue: "", updatedHeight: "" };
    this.state = this.initialState;
  }
  submitReport(event) {
    event.preventDefault();
    const { treeGuard, issue, updatedHeight } = this.state;
    if (!treeGuard || treeGuard === "") {
      alert("fill up treeguard option");
      return;
    }
    if (!issue || issue === "") {
      alert("fill up treeguard option");
      return;
    }
    if (!updatedHeight || updatedHeight === "") {
      alert("fill up treeguard option");
      return;
    }
    submitEnvReport(this.props.karamkoduId, treeGuard, issue, updatedHeight)
      .then(resp => {
        if (resp.status === 201) {
          alert("success");
          this.props.goBack();
        } else {
          alert("Failed! Try Again");
        }
      })
      .catch(err => console.log(err));
  }

  renderRadioGroup(label, key) {
    return (
      <div class="form-group">
        <label>{label}</label>
        <br />
        <div class="form-check-inline">
          <label class="form-check-label">
            <input
              name={key}
              type="radio"
              class="form-check-input"
              onChange={() => {
                this.setState({ [key]: "YES" });
              }}
            />
            Yes
          </label>
        </div>
        <div class="form-check-inline">
          <label class="form-check-label">
            <input
              name={key}
              type="radio"
              class="form-check-input"
              onChange={() => {
                this.setState({ [key]: "NO" });
              }}
            />
            No
          </label>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="page-wrapper">
        <div class="container">
          <center>
            <h3 className="title">Environment Report</h3>
            <br />
          </center>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <form onSubmit={event => this.submitReport(event)}>
                <div class="row" className="rowstyle">
                  <div class="form-group">
                    <label>Plant Height</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter current height of plant(in feet)"
                      onChange={event => {
                        this.setState({ updatedHeight: event.target.value });
                      }}
                    />
                  </div>
                  {this.renderRadioGroup(
                    "Is there any issues to be sorted out?",
                    "issue"
                  )}
                  {this.renderRadioGroup(
                    "Is tree guard required any further?",
                    "treeGuard"
                  )}
                  <input type="submit" class="btn btn-dark" value="Submit" />
                </div>
              </form>
            </div>
            <div class="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnvironmentReport;
