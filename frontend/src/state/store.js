import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import routesReducer from "./reducers/routesReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    routes: routesReducer,
  },
});
