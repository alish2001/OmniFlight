import Axios from "axios";

export const onLogin = async (values) => {
  const body = { ...values };
  try {
    const response = await Axios.post(
      "http://localhost:9000/users/login/",
      body
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const onRegister = async (values) => {
  const body = { ...values };
  try {
    const response = await Axios.post(
      "http://localhost:9000/users/register/",
      body
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const onViewFavorites = async (values) => {
  const body = { ...values };
  try {
    const response = await Axios.post(
      "http://localhost:9000/favorites/",
      body
    );
    return response;
  } catch (err) {
    return false;
  }
};

export const onAddFavorite = async (values) => {
  const body = { ...values };
  try {
    const response = await Axios.post(
      "http://localhost:9000/favorites/add/",
      body
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const onRemoveFavorite = async (values) => {
  const body = { ...values };
  try {
    const response = await Axios.post(
      "http://localhost:9000/favorites/remove/",
      body
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};
