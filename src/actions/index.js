import { UPDATE_TOKEN, UPDATE_IS_LOGGED_IN,UPDATE_USER_ID } from "./action-types";

function updateToken(payload) {
  return { type: UPDATE_TOKEN, payload };
}
function updateLoginStatus(payload) {
    return { type: UPDATE_IS_LOGGED_IN, payload };
}

function updateUserId(payload) {
  return { type: UPDATE_USER_ID, payload };
}

export {updateToken, updateLoginStatus, updateUserId};

