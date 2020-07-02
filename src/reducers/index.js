import {
  UPDATE_IS_LOGGED_IN,
  UPDATE_PLANT_STATUS,
  UPDATE_ENVIRONMENT_FLAG
} from "../actions/action-types";

const token =
  "token" in localStorage ? window.atob(localStorage.getItem("token")) : null;

const karamkoduId =
  "karamkodu_data" in localStorage
    ? (function() {
        let data = window.atob(localStorage.getItem("karamkodu_data"));
        if (data) {
          const dataSplit = data.split(":");
          if (dataSplit.length === 2) {
            return dataSplit[1];
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      })()
    : -1;
const initialState = {
  isLoggedIn: token && token.includes("kk"),
  plantRegister: false,
  teamFlag: false,
  environmentFlag: false,
  educationFlag: false,
  rehabilitationFlag: false,
  karamkoduId: karamkoduId
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_LOGGED_IN:
      return Object.assign({}, state, {
        isLoggedIn: action.payload
      });
    case UPDATE_PLANT_STATUS:
      return Object.assign({}, state, {
        plantRegister: action.payload
      });
    case UPDATE_ENVIRONMENT_FLAG:
      return Object.assign({}, state, {
        environmentFlag: action.payload
      });
    default:
      return state;
  }
}

export default rootReducer;
