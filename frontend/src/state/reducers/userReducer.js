import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  user_id: null,
  first_name: null,
  last_name: null,
  email: null,
  isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        isLoggedIn: true,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
