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
