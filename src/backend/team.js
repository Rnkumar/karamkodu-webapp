import axios from "axios";
import { TEAM_MEMBER_STATUS } from "./config";

const getTeamMemberStatus = async (karamkoduId, teamName) => {
  return await axios.get(
    TEAM_MEMBER_STATUS +
      "?karamkodu_id=" +
      karamkoduId +
      "&team_name=" +
      teamName.toUpperCase()
  );
};

export { getTeamMemberStatus };
