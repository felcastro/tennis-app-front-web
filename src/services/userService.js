import authHeader from "../helpers/authHeader";
import api from "./api";

async function list(params) {
  const url = `/users`;

  const response = await api.get(url, {
    params,
    headers: authHeader(),
  });

  return response.data;
}

async function get(id) {
  const url = `/users/${id}`;

  const response = await api.get(url, {
    headers: authHeader(),
  });

  return response.data;
}

async function update(id, body) {
  const url = `/users/${id}`;

  const response = await api.put(url, body, {
    headers: authHeader(),
  });

  return response.data;
}

async function updatePicture(id, body) {
  const url = `/users/${id}/picture`;

  const response = await api.put(url, body, {
    headers: authHeader("multipart/form-data"),
  });

  return response.data;
}

export default {
  list,
  get,
  update,
  updatePicture,
};
