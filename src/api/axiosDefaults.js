import axios from "axios";

axios.defaults.baseURL = "https://thrill-seekers-api-5fd87044d4ac.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();