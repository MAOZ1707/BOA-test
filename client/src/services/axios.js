import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
    "Access-Control-Allow-Origin": "*",
  },
});

export const saveDataToDB = async () => {
  const response = await axiosInstance.get("/save");
  return response;
};

export const getAllOrders = async () => {
  const response = await axiosInstance.get();
  const { data } = response.data;
  return data;
};

export const getLineItems = async (orderNumber) => {
  const response = await axiosInstance.get(`/line-items/${orderNumber}`);

  const { data } = response.data;
  return data;
};
