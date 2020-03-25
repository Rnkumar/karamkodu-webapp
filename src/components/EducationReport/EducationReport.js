import React, { Component } from "react";
import "./EducationReport.css";

export default class EducationReport extends Component {
  renderSelect(n) {
    let options = [];
    for (let i = 0; i < n; i++) {
      options.push(<option>{i + 1}</option>);
    }
    return options;
  }

  submitReport() {}

  render() {
    return (
      <div class="page-wrapper">
        <div class="container" style={{ color: "black" }}>
          <center>
            <h3 className="title">Education Report</h3>
            <br />
          </center>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <form method="post" action="#">
                <div class="row" className="rowstyle">
                  <div class="form-group">
                    <label>Student Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="student_name"
                      placeholder="Enter student name here"
                    />
                  </div>
                  <div class="form-group">
                    <label>Topics Covered</label>
                    <br />
                    <input
                      type="text"
                      class="form-control"
                      name="topics_covered"
                      placeholder=" Enter the topics covered here"
                    />
                  </div>
                  <div class="form-group">
                    <label>Assigned Tasks</label>
                    <br />
                    <input
                      type="text"
                      class="form-control"
                      name="assigned_task"
                      placeholder=" Enter the assigned tasks here"
                    />
                  </div>
                  <div class="form-group">
                    <label>General Remarks</label>
                    <br />
                    <input
                      type="text"
                      class="form-control"
                      name="general_remarks"
                      placeholder=" Enter the general remarks here"
                    />
                  </div>
                  <div class="form-group">
                    <label>Choose class:</label>
                    <select class="form-control">
                      {this.renderSelect(12)}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Choose Improvement Scale:</label>
                    <select class="form-control">
                      {this.renderSelect(10)}
                    </select>
                  </div>
                  <label>Selected class date</label>
                  <br />
                  <input type="date" name="date" className="dateinput" />
                  <br />
                  <br />
                  <input
                    type="button"
                    class="btn btn-dark"
                    value="Submit"
                    onClick={this.submitReport()}
                  />
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
