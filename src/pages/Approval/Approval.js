import React from "react";
import logoblack from "./../../images/logo_black.png";
import "./Approval.css";

const Approval = () => {
  React.useEffect(() => {
    document.title = "Approval";
  }, []);
  return (
    <center>
      <img src={logoblack} alt="karamkodu logo" />
      <br />
      <br />
      Your request is waiting for approval.
      <br />
      <br />
      Thank You <br />
      <br />
      Team Karam Kodu <br />
      <br />
      <a href="index.html">
        <button className="btnstyle">Back to Profile</button>
      </a>
    </center>
  );
};

export default Approval;
