import React from "react";
import "./App.css";
import Profile from "./pages/Profile/Profile";
import Team from "./pages/Team/Team";
import PlantRegistration from "./pages/PlantRegistration/PlantRegistration";
import Report from "./pages/Report/Report";
import TeamRequest from "./pages/TeamRequest/TeamRequest";
import Approval from "./pages/Approval/Approval";
import Error from "./pages/Error/Error";
import Authentication from "./pages/Authentication/Authentication";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";
import PlantRoute from "./routes/PlantRoute";
import TeamRoute from "./routes/TeamRoute";
import { Provider } from "react-redux";
import store from "./store/index";
import "./backend/axiosConfig";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter basename="/react">
            <Switch>
              <PrivateRoute exact path="/" component={Profile} />
              <AuthRoute exact path="/login" component={Authentication} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PlantRoute exact path="/plant" component={PlantRegistration} />
              <TeamRoute exact path="/team/:name" component={Team} />
              <TeamRoute exact path="/report/:name" component={Report} />
              <TeamRoute exact path="/request/:name" component={TeamRequest} />
              <PrivateRoute
                exact
                path="/waiting-for-approval"
                component={Approval}
              />
              <Route component={Error} />
            </Switch>
          </BrowserRouter>
          <footer></footer>
        </div>
      </Provider>
    );
  }
}

export default App;
