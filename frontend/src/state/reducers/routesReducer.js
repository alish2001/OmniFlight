import { createSlice } from "@reduxjs/toolkit";

export const routesSlice = createSlice({
  name: "routes",
  initialState: {
    filteredRoutes: [],
    favoriteRoutes: [],
  },
  reducers: {
    setFilteredRoutes: (state, action) => {
      state.filteredRoutes = action.payload.filteredRoutes;
    },
    setFavoriteRoutes: (state, action) => {
      state.favoriteRoutes = action.payload.favoriteRoutes;
    },
    addToFavorites: (state, action) => {
      state.favoriteRoutes = [...state.favoriteRoutes, action.payload.route];
    },
    removeFromFavorites: (state, action) => {
      state.favoriteRoutes = state.favoriteRoutes.filter(
        (route) => route.routeUID !== action.payload.routeUID
      );
    },
    setPopularRoutes: (state, action) => {
      state.popularRoutes = action.payload.popularRoutes;
    },
  },
});

export const {
  setFilteredRoutes,
  setFavoriteRoutes,
  addToFavorites,
  removeFromFavorites,
  setPopularRoutes,
} = routesSlice.actions;

export default routesSlice.reducer;
