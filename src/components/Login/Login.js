import React, { useState } from "react";
import "./Login.css";
import { login } from "./../../backend/auth";
import { updateLoginStatus, updateKaramkoduId } from "../../actions";
import { connect } from "react-redux";

const Login = props => {
  const [karamkoduId, setKaramkoduId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const submit = event => {
    event.preventDefault();
    if (!validator(karamkoduId, password)) return;
    setLoading(true);
    login(karamkoduId, password)
      .then(resp => {
        const token = window.btoa("kk" + resp.data.access_token);
        localStorage.setItem("token", token);
        localStorage.setItem(
          "karamkodu_data",
          window.btoa("KKID:" + karamkoduId)
        );
        props.updateLoginStatus(true);
        props.updateKaramkoduId(karamkoduId);
        props.navigateToProfile();
      })
      .catch(err => {
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div class="container">
      <form onSubmit={event => submit(event)}>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="Karamkodu Id"
                onChange={event => setKaramkoduId(event.target.value)}
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
                onChange={event => setPassword(event.target.value)}
                class="form-control"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
        <center>
          {loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <input type="submit" value="GO" className="button" />
          )}
        </center>
      </form>
    </div>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    updateKaramkoduId: karamkoduId => dispatch(updateKaramkoduId(karamkoduId)),
    updateLoginStatus: status => dispatch(updateLoginStatus(status))
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
