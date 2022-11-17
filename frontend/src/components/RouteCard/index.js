import { Col, Layout, Typography, Row, Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import { IoIosAirplane } from "react-icons/io";
import { CgArrowLongRight } from "react-icons/cg";
import "./RouteCard.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAddFavorite, onRemoveFavorite } from "../../api";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/reducers/routesReducer";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const RouteCard = ({ routeData, isFavorite }) => {
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [favorite, setFavorite] = useState(isFavorite);
  const [error, setError] = useState(false);

  const {
    routeUID,
    origin,
    origin_iata,
    destination,
    destination_iata,
    airline,
  } = routeData;

  const handleFavoriteClick = async () => {
    let res;
    let values = { userid: user.userid, routeUID: routeUID };
    if (!favorite) {
      res = await onAddFavorite(values);
    } else {
      res = await onRemoveFavorite(values);
      dispatch(removeFromFavorites({ routeUID }));
    }

    if (res) {
      setError(false);
      setFavorite(!favorite);
    } else {
      setError(true);
    }
  };

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
