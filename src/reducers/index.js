import { UPDATE_TOKEN, UPDATE_IS_LOGGED_IN } from "../actions/action-types";

const initialState = {
  token: "",
  isLoggedIn: false,
  plantRegister: false,
  teamFlag: false,
  environmentFlag: false,
  educationFlag: false,
  rehabilitationFlag: false,
  userId: -1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return Object.assign({}, state, {
        token: action.payload,
      });
    case UPDATE_IS_LOGGED_IN:
      return Object.assign({}, state, {
        isLoggedIn: action.payload,
      });
    default:
      return state;
  }
}

export default rootReducer;
