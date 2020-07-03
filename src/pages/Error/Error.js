import React from "react";
import logoblack from "./../../images/logo_black.png";

const Error = () => {
  React.useEffect(() => {
    document.title = "ERROR";
  }, []);

  return (
    <center>
      <img src={logoblack} alt="karamkodu logo" />
      <br />
      <br />
      Error! Page Not Found
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

export default Error;
