import React from "react";
import "./App.css";
import Profile from "./pages/Profile/Profile";
import Team from "./pages/Team/Team";
import Report from "./pages/Report/Report";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header></header>
      <div>
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route path="/team" component={Team} />
          <Route path="/report" component={Report} />
        </Switch>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
