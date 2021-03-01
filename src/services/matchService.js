import authHeader from "../helpers/authHeader";
import api from "./api";

async function list(params) {
  const url = `/matches`;

  const response = await api.get(url, {
    params,
    headers: authHeader(),
  });

  return response.data;
}

export default {
  list,
};
