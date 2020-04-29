import React from "react";
import "./App.css";
import Profile from "./pages/Profile/Profile";
import Team from "./pages/Team/Team";
import PlantRegistration from "./pages/PlantRegistration/PlantRegistration";
import Report from "./pages/Report/Report";
import Approval from "./pages/Approval/Approval";
import Error from "./pages/Error/Error";
import Authentication from "./pages/Authentication/Authentication";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";
import PlantRoute from "./routes/PlantRoute";
import TeamRoute from "./routes/TeamRoute";
import { Provider } from "react-redux";
import store from "./store/index";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header></header>
          <div>
            <Switch>
              <AuthRoute path="/login" component={Authentication} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <TeamRoute exact path="/team/:name" component={Team} />
              <PlantRoute exact path="/plant" component={PlantRegistration} />
              <TeamRoute exact path="/report/:name" component={Report} />
              <PrivateRoute
                exact
                path="/waiting-for-approval"
                component={Approval}
              />
              <Route path="*" component={Error} />
            </Switch>
          </div>
          <footer></footer>
        </div>
      </Provider>
    );
  }
}

export default App;
