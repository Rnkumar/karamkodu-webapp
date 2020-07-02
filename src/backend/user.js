import { PROFILE_URL, VERIFY_USER_URL, JOIN_TEAM_REQUEST_URL } from "./config";
import axios from "axios";

const verifyUserId = async user_id => {
  const res = await fetch(VERIFY_USER_URL + "?user_id=" + user_id);
  return res.json();
};

const joinTeamRequest = async (teamName, leaderId, centerName, karamkoduId) => {
  let formData = new FormData();
  formData.append("team", teamName);
  formData.append("lead_id", leaderId);
  formData.append("location", centerName);
  formData.append("member_id", karamkoduId);
  const res = await fetch(JOIN_TEAM_REQUEST_URL, {
    method: "POST",
    body: formData
  });
  return res.json();
};

const getProfile = async karamkoduId => {
  return await axios.get(PROFILE_URL + "?karamkodu_id=" + karamkoduId);
};

export { getProfile, verifyUserId, joinTeamRequest };
