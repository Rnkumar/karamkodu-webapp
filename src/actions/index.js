import { UPDATE_TOKEN, UPDATE_IS_LOGGED_IN } from "./action-types";

function updateToken(payload) {
  return { type: UPDATE_TOKEN, payload };
}
function updateLoginStatus(payload) {
    return { type: UPDATE_IS_LOGGED_IN, payload };
}

export {updateToken, updateLoginStatus};

