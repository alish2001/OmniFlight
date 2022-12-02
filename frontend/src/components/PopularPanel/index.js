import {
  Col,
  Layout,
  Typography,
  Menu,
  Drawer,
  Space,
  Button,
  Row,
} from "antd";
import "./PopularPanel.scss";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onViewPopular } from "../../api";
import RouteCard from "../RouteCard";

const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const PopularPanel = () => {
  const favRoutes = useSelector((state) => state.routes.favoriteRoutes);

  const [popularRoutes, setPopularRoutes] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      let res = await onViewPopular();
      if (res) {
        setPopularRoutes(res.data);
      } else {
        console.log("There was an error getting the popular favorites!");
      }
    };
    fetchPopular();
  }, []);

  return (
    <Col>
      {popularRoutes &&
        popularRoutes.map((route) => (
          <Row justify="space-around" align="middle">
            <Text strong style={{ fontSize: 18 }}>
              Popularity: {route.popularity}
            </Text>
            <RouteCard
              key={route.routeUID}
              routeData={{
                routeUID: route.routeUID,
                origin: route.origin_city,
                origin_iata: route.origin_iata,
                destination: route.dest_city,
                destination_iata: route.dest_iata,
                airline: route.airline_name,
              }}
              isFavorite={favRoutes.some(
                (favRoute) => favRoute.routeUID === route.routeUID
              )}
            />
          </Row>
        ))}
    </Col>
  );
};

export default PopularPanel;
