import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "./types";

export const loginUser = (data) => {
  return {
    type: USER_LOGIN,
    payload: {
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
    },
  };
};

export const userSignOut = (data) => {
  return {
    type: USER_LOGOUT,
    payload: {},
  };
};
