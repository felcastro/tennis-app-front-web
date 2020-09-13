import { createStore } from "redux";

if (!localStorage.getItem("configuration")) {
  localStorage.setItem(
    "configuration",
    JSON.stringify({ darkThemeEnabled: false })
  );
}

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user-data")),
  isSideMenuOpen: true,
  isNavbarMenuOpen: false,
  configuration: JSON.parse(localStorage.getItem("configuration")),
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "SIGNIN_USER") {
    return { ...state, user: action.user };
  }
  if (action.type === "CHANGE_SIDEMENU") {
    return { ...state, isSideMenuOpen: !state.isSideMenuOpen };
  }
  if (action.type === "CHANGE_NAVBAR_MENU") {
    return { ...state, isNavbarMenuOpen: !state.isNavbarMenuOpen };
  }

  return state;
}

const store = createStore(reducer);

export default store;
