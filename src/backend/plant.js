import axios from "axios";
import { GET_PLANT_URL, REGISTER_PLANT_URL } from "./config";

const getPlant = async karamkoduId => {
  return await axios.get(GET_PLANT_URL + "?karamkodu_id=" + karamkoduId);
};

const registerPlant = async (
  karamkoduId,
  { plantName, plantHeight, plantedDate, pincode, latitude, longitude }
) => {
  return await axios.post(REGISTER_PLANT_URL, {
    karamkodu_id: karamkoduId,
    planted_date_time: plantedDate,
    plant_name: plantName,
    plant_height: plantHeight,
    pincode: pincode,
    latitude: latitude,
    longitude: longitude
  });
};

export { getPlant, registerPlant };
