import { VERIFY_USER_URL, JOIN_TEAM_REQUEST_URL } from "./config";

const verifyUserId = async user_id => {
  const res = await fetch(VERIFY_USER_URL + "?user_id=" + user_id);
  return res.json();
};

const joinTeamRequest = async (teamName, leaderId, centerName, userId) => {
  let formData = new FormData();
  formData.append("team", teamName);
  formData.append("lead_id", leaderId);
  formData.append("location", centerName);
  formData.append("member_id", userId);
  const res = await fetch(JOIN_TEAM_REQUEST_URL, {
    method: "POST",
    body: formData
  });
  return res.json();
};

export { verifyUserId, joinTeamRequest };
