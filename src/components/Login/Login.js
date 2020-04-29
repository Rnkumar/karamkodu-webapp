import React, { useState } from "react";
import "./Login.css";
import { login } from "./../../backend/auth";

const Login = (props) => {
  const [karamkoduId, setKaramkoduId] = useState("");
  const [password, setPassword] = useState("");

  const validator = (karamkoduId, password) => {
    if (karamkoduId === "") {
      alert("Enter karamkodu Id");
      return false;
    }

    if (password === "") {
      alert("Enter password");
      return false;
    }

    return true;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validator(karamkoduId, password)) return;

    login(karamkoduId, password)
      .then((resp) => {
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          alert("Make sure you have connected to a network");
          return;
        }

        switch (err.response.status) {
          case 401:
            alert("Wrong Credentials! Try Again");
            break;
          case 400:
            alert("Bad Request! Try Again");
            break;
          default:
            alert("Server Error! Contact Admin");
            break;
        }
      });
  };

  return (
    <div class="container">
      <form onSubmit={(event) => /*submit(event)*/props.navigateToProfile()}>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="Karamkodu Id"
                onChange={(event) => setKaramkoduId(event.target.value)}
              />
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="form-group">
              <input
                onChange={(event) => setPassword(event.target.value)}
                class="form-control"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
        <center>
          <input type="submit" value="GO" className="button" />
        </center>
      </form>
    </div>
  );
};

export default Login;
