import { createStore } from "redux";

const INITIAL_STATE = {
  token: localStorage.getItem("user-token"),
  user: JSON.parse(localStorage.getItem("user-data")),
  isSidebarOpen: true,
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "SIGNIN_USER") {
    return { ...state, user: action.user, token: action.token };
  }
  if (action.type === "UPDATE_USER") {
    localStorage.setItem("user-data", JSON.stringify(action.user));
    return { ...state, user: action.user };
  }
  if (action.type === "CHANGE_SIDEBAR") {
    return { ...state, isSidebarOpen: !state.isSidebarOpen };
  }

  return state;
}

const store = createStore(reducer);

export default store;
