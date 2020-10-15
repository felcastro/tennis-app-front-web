import authHeader from "../helpers/authHeader";
import api from "./api";

async function list(params) {
  const url = `/levels`;

  const response = await api.get(url, {
    params,
    headers: authHeader(),
  });

  return response.data;
}

async function get(id) {
  const url = `/levels/${id}`;

  const response = await api.get(url, {
    headers: authHeader(),
  });

  return response.data;
}

export default {
  list,
  get,
};
