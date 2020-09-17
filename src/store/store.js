import { createStore } from "redux";

if (!localStorage.getItem("configuration")) {
  localStorage.setItem(
    "configuration",
    JSON.stringify({ darkThemeEnabled: false })
  );
}

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user-data")),
  isSidebarOpen: true,
  configuration: JSON.parse(localStorage.getItem("configuration")),
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "SIGNIN_USER") {
    return { ...state, user: action.user };
  }
  if (action.type === "CHANGE_SIDEBAR") {
    return { ...state, isSidebarOpen: !state.isSidebarOpen };
  }

  return state;
}

const store = createStore(reducer);

export default store;
