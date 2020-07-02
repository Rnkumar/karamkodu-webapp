import { LOGIN_URL } from "./config";
import axios from "axios";

const login = async (karamkoduId, password) => {
  const response = await axios.post(LOGIN_URL, {
    karamkodu_id: karamkoduId,
    password: password
  });
  return response;
};

export { login };
