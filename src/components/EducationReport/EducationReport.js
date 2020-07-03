import React, { Component } from "react";
import "./EducationReport.css";
import { submitEducationReport } from "./../../backend/report";

export default class EducationReport extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      studentName: "",
      topicsCovered: "",
      assignedTasks: "",
      generalRemarks: "",
      classValue: "1",
      improvementScale: "1",
      date: ""
    };
    this.state = { ...this.initialState };
  }

  renderSelect(n) {
    let options = [];
    for (let i = 0; i < n; i++) {
      options.push(<option key={i}>{i + 1}</option>);
    }
    return options;
  }

  submitReport() {
    const {
      studentName,
      topicsCovered,
      assignedTasks,
      generalRemarks,
      classValue,
      improvementScale,
      date
    } = this.state;
    if (!studentName || studentName === "") {
      alert("fill up student name");
      return;
    }

    if (!topicsCovered || topicsCovered === "") {
      alert("fill up topics covered");
      return;
    }

    if (!assignedTasks || assignedTasks === "") {
      alert("fill up assigned tasks");
      return;
    }
    if (!generalRemarks || generalRemarks === "") {
      alert("fill up general remarks");
      return;
    }

    if (!date || date === "") {
      alert("fill up date");
      return;
    }

    submitEducationReport(this.props.karamkoduId, this.state)
      .then(resp => {
        if (resp.status === 201) {
          alert("success");
          this.props.goBack();
        } else {
          alert("Try Again!");
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          alert(err.response.data.message);
        }
      });
  }

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
                      onChange={event =>
                        this.setState({ studentName: event.target.value })
                      }
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
                      onChange={event =>
                        this.setState({ topicsCovered: event.target.value })
                      }
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
                      onChange={event =>
                        this.setState({ assignedTasks: event.target.value })
                      }
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
                      onChange={event =>
                        this.setState({ generalRemarks: event.target.value })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label>Choose class:</label>
                    <select
                      class="form-control"
                      onChange={event =>
                        this.setState({ classValue: event.target.value })
                      }
                    >
                      {this.renderSelect(12)}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Choose Improvement Scale:</label>
                    <select
                      class="form-control"
                      onChange={event =>
                        this.setState({ improvementScale: event.target.value })
                      }
                    >
                      {this.renderSelect(10)}
                    </select>
                  </div>
                  <label>Selected class date</label>
                  <br />
                  <input
                    type="date"
                    onChange={event =>
                      this.setState({ date: event.target.value })
                    }
                    name="date"
                    className="dateinput"
                  />
                  <br />
                  <br />
                  <input
                    type="button"
                    class="btn btn-dark"
                    value="Submit"
                    onClick={() => this.submitReport()}
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
