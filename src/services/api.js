import axios from "axios";

// TODO: Usar dotenv
const api = axios.create({
  baseURL: "http://192.168.0.10:3001/api",
});

export default api;
