import axios from "axios";
import {
  SUBMIT_ENVIRONMENT_REPORT_URL,
  SUBMIT_EDUCATION_REPORT_URL
} from "./config";

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

const submitEducationReport = async (
  karamkoduId,
  {
    improvementScale,
    classValue,
    topicsCovered,
    generalRemarks,
    assignedTasks,
    studentName
  }
) => {
  return await axios.post(SUBMIT_EDUCATION_REPORT_URL, {
    karamkodu_id: karamkoduId,
    improvement_scale: improvementScale,
    class: classValue,
    topics_covered: topicsCovered,
    general_remarks: generalRemarks,
    assigned_tasks: assignedTasks,
    student_name: studentName
  });
};

export { submitEnvReport, submitEducationReport };
