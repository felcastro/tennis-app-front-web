import api from "./api";

async function signIn(body) {
  const url = `/users/signIn`;
  const response = await api.post(url, body);

  const data = {
    user: response.data,
    token: response.headers.authorization,
  };

  localStorage.setItem("user-token", data.token);
  localStorage.setItem("user-data", JSON.stringify(data.user));

  return data;
}

async function signUp(body) {
  const url = `/users`;
  const response = await api.post(url, body);

  const data = {
    user: response.data,
    token: response.headers.authorization,
  };

  localStorage.setItem("user-token", data.token);
  localStorage.setItem("user-data", JSON.stringify(data.user));

  return data;
}

function signOut() {
  localStorage.removeItem("user-token");
  localStorage.removeItem("user-data");
}

export default {
  signIn,
  signUp,
  signOut,
};
