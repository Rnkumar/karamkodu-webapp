import axios from "axios";
import {
  TEAM_MEMBER_STATUS,
  GET_TEAM_MEMBERS_URL,
  GET_TEAM_REQUESTS_URL,
  TEAM_REQUEST_UPDATE_URL
} from "./config";

const getTeamMemberStatus = async (karamkoduId, teamName) => {
  return await axios.get(
    TEAM_MEMBER_STATUS +
      "?karamkodu_id=" +
      karamkoduId +
      "&team_name=" +
      teamName.toUpperCase()
  );
};

const getTeamMembers = async (karamkoduId, team) => {
  return axios.get(
    GET_TEAM_MEMBERS_URL +
      "?karamkodu_id=" +
      karamkoduId +
      "&team_name=" +
      team.toUpperCase()
  );
};

const getTeamRequests = async (karamkoduId, team) => {
  return axios.get(
    GET_TEAM_REQUESTS_URL +
      "?karamkodu_id=" +
      karamkoduId +
      "&team_name=" +
      team.toUpperCase()
  );
};

const updateTeamRequest = async (memberId, leaderId, teamName, action) => {
  return axios.put(TEAM_REQUEST_UPDATE_URL, {
    member_karamkodu_id: memberId,
    leader_karamkodu_id: leaderId,
    action: action,
    team_name: teamName
  });
};

export {
  getTeamMemberStatus,
  getTeamMembers,
  getTeamRequests,
  updateTeamRequest
};
