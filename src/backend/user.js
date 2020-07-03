import {
  PROFILE_URL,
  VERIFY_USER_URL,
  JOIN_TEAM_AS_MEMBER_REQUEST_URL,
  JOIN_TEAM_AS_LEADER_REQUEST_URL
} from "./config";
import axios from "axios";

const verifyUserId = async (karamkoduId, teamName) => {
  return axios.get(
    VERIFY_USER_URL + "?karamkodu_id=" + karamkoduId + "&team_name=" + teamName
  );
};

const joinTeamAsMemberRequest = async (teamName, leaderId, karamkoduId) => {
  return await axios.post(JOIN_TEAM_AS_MEMBER_REQUEST_URL, {
    team_name: teamName,
    leader_karamkodu_id: leaderId,
    member_karamkodu_id: karamkoduId
  });
};

const joinTeamAsLeaderRequest = async (
  teamName,
  leaderId,
  centerName,
  karamkoduId
) => {
  return await axios.post(JOIN_TEAM_AS_LEADER_REQUEST_URL, {
    team_name: teamName,
    leader_karamkodu_id: leaderId,
    member_karamkodu_id: karamkoduId,
    location: centerName
  });
};

const getProfile = async karamkoduId => {
  return await axios.get(PROFILE_URL + "?karamkodu_id=" + karamkoduId);
};

export {
  getProfile,
  verifyUserId,
  joinTeamAsMemberRequest,
  joinTeamAsLeaderRequest
};
