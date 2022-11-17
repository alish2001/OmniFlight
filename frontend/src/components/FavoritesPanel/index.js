import { Col, Layout, Typography, Menu, Drawer, Space, Button } from "antd";
import "./FavoritesPanel.scss";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onViewFavorites } from "../../api";
import RouteCard from "../RouteCard";
import { setFavoriteRoutes } from "../../state/reducers/routesReducer";

const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const FavoritesPanel = () => {
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFavorites = async () => {
      let res = await onViewFavorites({ userid: user.userid });
      if (res) {
        dispatch(setFavoriteRoutes({ favoriteRoutes: res.data }));
      } else {
        console.log("There was an error getting the favorites!");
      }
    };
    fetchFavorites();
  }, []);
  const routes = useSelector((state) => state.routes.favoriteRoutes);

  return (
    <>
      {routes &&
        routes.map((route) => (
          <RouteCard key={route.routeUID} routeData={route} isFavorite={true} />
        ))}
    </>
  );
};

export default FavoritesPanel;
