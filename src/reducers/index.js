import {
  UPDATE_IS_LOGGED_IN,
  UPDATE_PLANT_STATUS,
  UPDATE_ENVIRONMENT_FLAG,
  RESET,
  UPDATE_KARAMKODU_ID,
  UPDATE_EDUCATION_FLAG,
  UPDATE_REHABILITATION_FLAG
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
  isLoggedIn: token && token.includes("kk") ? true : false,
  plantRegister: false,
  teamFlag: false,
  environmentFlag: false,
  educationFlag: false,
  rehabilitationFlag: false,
  karamkoduId: karamkoduId
};

const resetState = {
  isLoggedIn: false,
  plantRegister: false,
  teamFlag: false,
  environmentFlag: false,
  educationFlag: false,
  rehabilitationFlag: false,
  karamkoduId: -1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_LOGGED_IN:
      return Object.assign({}, state, {
        isLoggedIn: action.payload
      });
    case UPDATE_KARAMKODU_ID:
      return { ...state, karamkoduId: action.payload };
    case UPDATE_PLANT_STATUS:
      return Object.assign({}, state, {
        plantRegister: action.payload
      });
    case UPDATE_ENVIRONMENT_FLAG:
      return Object.assign({}, state, {
        environmentFlag: action.payload
      });
    case UPDATE_EDUCATION_FLAG:
      return Object.assign({}, state, {
        educationFlag: action.payload
      });
    case UPDATE_REHABILITATION_FLAG:
      return Object.assign({}, state, {
        rehabilitationFlag: action.payload
      });
    case RESET:
      console.log(
        Object.assign({}, state, {
          karamkoduId: action.payload
        })
      );
      return resetState;
    default:
      return state;
  }
}

export default rootReducer;
