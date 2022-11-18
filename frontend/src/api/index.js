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

export const getFilteredRoutes = async (filters) => {
  const body = { ...filters };
  try {
    const response = await Axios.post(
      "http://localhost:9000/routes/getFilterRoutes/",
      body
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const getRoutes = async (filters) => {
  const body = { ...filters };
  try {
    const response = await Axios.post(
      "http://localhost:9000/routes/getRoutes/",
      body
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const getCities = async () => {
  try {
    const response = await Axios.get("http://localhost:9000/routes/getCities/");
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const getCountries = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:9000/routes/getCountries/"
    );
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
};

export const getAirlines = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:9000/routes/getAirlines/"
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
    const response = await Axios.post("http://localhost:9000/favorites/", body);
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
