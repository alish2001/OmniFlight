import { Col, Layout, Typography, Row, Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import { IoIosAirplane } from "react-icons/io";
import { CgArrowLongRight } from "react-icons/cg";
import "./RouteCard.scss";
import React, { useState } from "react";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const RouteCard = ({ routeData, isFavorite }) => {
  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  const [favorite, setFavorite] = useState(isFavorite);

  const {
    origin,
    origin_iata,
    destination,
    destination_iata,
    airline,
    airplane_type,
  } = routeData;

  return (
    <Card hoverable className="routecard_container">
      <StarFilled
        onClick={() => handleFavoriteClick()}
        className={favorite ? "favorited_icon" : "non_favorited_icon"}
      />
      <Row justify="center">
        <Row align="middle">
          <Text>{`${origin} (${origin_iata}) `}</Text>
          <CgArrowLongRight size={35} />
        </Row>
        <Col justify={"center"} align="middle">
          <Text strong style={{ fontSize: 18 }}>
            {airline}
          </Text>
          <Row justify="center" align="middle">
            <IoIosAirplane size={35} />
          </Row>

          <Text style={{ display: "flex", height: "25px" }}>
            {airplane_type}
          </Text>
        </Col>
        <Row align="middle">
          <CgArrowLongRight size={35} />
          <Text>{`${destination} (${destination_iata}) `}</Text>
        </Row>
      </Row>
    </Card>
  );
};

export default RouteCard;
