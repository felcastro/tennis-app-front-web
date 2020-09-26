import axios from "axios";

// TODO: Usar dotenv
const api = axios.create({
  baseURL: "http://34.68.66.227:3001/api",
});

export default api;
