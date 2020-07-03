import axios from "axios";
import { SUBMIT_ENVIRONMENT_REPORT_URL } from "./config";

const submitEnvReport = async (
  karamkoduId,
  treeGuard,
  issue,
  updatedHeight
) => {
  return await axios.post(SUBMIT_ENVIRONMENT_REPORT_URL, {
    karamkodu_id: karamkoduId,
    tree_guard: treeGuard,
    issue: issue,
    updated_height: updatedHeight
  });
};

export { submitEnvReport };
