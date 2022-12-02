import {
  Col,
  Layout,
  Typography,
  Table,
  Menu,
  Drawer,
  Space,
  Button,
  Row,
} from "antd";
import "./SummaryPanel.scss";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSummaryAirlineInfo, getSummaryPlaneInfo } from "../../api";
import RouteCard from "../RouteCard";

const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const SummaryPanel = () => {
  const [popularAirlines, setPopularAirlines] = useState(undefined);
  const [popularPlanes, setPopularPlanes] = useState(undefined);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchSummary = async () => {
      let res = await getSummaryAirlineInfo();
      if (res) {
        setPopularAirlines(res.data);
        console.log(popularAirlines);
      } else {
        console.log(
          "There was an error getting the airline summary information!"
        );
      }
      res = await getSummaryPlaneInfo();
      if (res) {
        setPopularPlanes(res.data);
        console.log(popularPlanes);
      } else {
        console.log(
          "There was an error getting the plane summary information!"
        );
      }
    };
    fetchSummary();
  }, []);

  useEffect(() => {
    let temp = [];
    if (popularAirlines && popularPlanes) {
      for (let i = 0; i < 10; ++i) {
        temp[i] = {
          key: i,
          rank: i + 1,
          plane: popularPlanes[i].name,
          airline: popularAirlines[i].name,
          routes: popularAirlines[i].airlineCount,
        };
      }
      setData(temp);
    }
  }, [popularPlanes, popularAirlines]);

  console.log(data);

  const columns = [
    {
      title: "Ranking",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Most Frequently Used Planes",
      dataIndex: "plane",
      key: "plane",
    },
    {
      title: "Airlines with Most Routes",
      dataIndex: "airline",
      key: "airline",
    },
    {
      title: "# of Routes",
      dataIndex: "routes",
      key: "routes",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={popularAirlines && popularPlanes ? data : []}
    />
  );
};

export default SummaryPanel;
