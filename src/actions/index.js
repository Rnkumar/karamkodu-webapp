import {
  UPDATE_TOKEN,
  UPDATE_IS_LOGGED_IN,
  UPDATE_KARAMKODU_ID,
  UPDATE_PLANT_STATUS,
  UPDATE_ENVIRONMENT_FLAG,
  RESET
} from "./action-types";

function updateToken(payload) {
  return { type: UPDATE_TOKEN, payload };
}
function updateLoginStatus(payload) {
  return { type: UPDATE_IS_LOGGED_IN, payload };
}

function updateKaramkoduId(payload) {
  return { type: UPDATE_KARAMKODU_ID, payload };
}

function updatePlantStatus(payload) {
  return { type: UPDATE_PLANT_STATUS, payload };
}

function updateEnvironmentFlag(payload) {
  return { type: UPDATE_ENVIRONMENT_FLAG, payload };
}

function reset() {
  return { type: RESET };
}

export {
  updateToken,
  updateLoginStatus,
  updateKaramkoduId,
  updatePlantStatus,
  updateEnvironmentFlag,
  reset
};
