import axios from "axios";

// TODO: Usar dotenv
const api = axios.create({
  baseURL: "http://192.168.0.17:3001/api",
});

export default api;
