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
      <Col style={{ padding: 5 }} align="middle">
        <StarFilled
          onClick={() => handleFavoriteClick()}
          className={favorite ? "favorited_icon" : "non_favorited_icon"}
        />
        <Text strong style={{ fontSize: 18 }}>
          {airline}
        </Text>
        <Row style={{}} justify="center" align="middle">
          <Row align="middle">
            <Text
              style={{ paddingRight: "15px" }}
            >{`${origin} (${origin_iata}) `}</Text>
            <CgArrowLongRight size={35} />
          </Row>
          <Col justify={"center"} align="middle">
            <Row
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
              justify="center"
              align="middle"
            >
              <IoIosAirplane size={35} />
            </Row>
          </Col>
          <Row align="middle">
            <CgArrowLongRight size={35} />
            <Text
              style={{ paddingLeft: "15px" }}
            >{`${destination} (${destination_iata}) `}</Text>
          </Row>
        </Row>
      </Col>
    </Card>
  );
};

export default RouteCard;
