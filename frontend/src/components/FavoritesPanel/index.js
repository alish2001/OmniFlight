import { Col, Layout, Typography, Menu, Drawer, Space, Button } from "antd";
import "./FavoritesPanel.scss";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { onViewFavorites } from "../../api";
import RouteCard from "../RouteCard";

const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const FavoritesPanel = () => {
  const user = useSelector((state) => state.user);
  const [routes, setRoutes] = useState([]);
    const GetData = async () => {
      let res = await onViewFavorites({ userid: user.userid });
      if (res) {
        setRoutes(res.data)
      } else {
        console.log("There was an error getting the favorites!")
      }
    }
    GetData();
  return (
    <>
    { routes && routes.map(route =>
      <RouteCard
        key={route.routeUID}
        routeData={route}
        isFavorite={true}
      />
    )}
    </>
  );
};

export default FavoritesPanel;
