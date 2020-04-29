import { LOGIN_URL } from "./config";
import axios from 'axios';
import './axiosConfig';


const login = async (karamkoduId, password) => {
  const data = new FormData();
  data.append('user_id',karamkoduId);
  data.append('password', password);
  const response = await axios.post(LOGIN_URL, data);
  return response;
};

export { login };
