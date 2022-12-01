import { Col, Layout, Typography, Table, Menu, Drawer, Space, Button, Row } from "antd";
import "./SummaryPanel.scss";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSummaryAirlineInfo, getSummaryPlaneInfo } from "../../api";
import RouteCard from "../RouteCard";

const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const SummaryPanel = () => {
  let popularAirlines, popularPlanes;

  useEffect(() => {
    const fetchSummary = async () => {
      let res = await getSummaryAirlineInfo();
      if (res) {
        popularAirlines = res.data;
        console.log(popularAirlines);
      } else {
        console.log("There was an error getting the airline summary information!");
      }
      res = await getSummaryPlaneInfo();
      if (res) {
        popularPlanes = res.data;
        console.log(popularPlanes);
      } else {
        console.log("There was an error getting the plane summary information!");
      }
    };
    fetchSummary();
  }, []);

  /*
  let data = Array(10);
  for (let i = 0; i < 10; ++i) {
    data[i] = {
      rank: i + 1,
      plane: popularPlanes[i].name,
      airline: popularAirlines[i].name,
      routes: popularAirlines[i].a
    };
  }
*/
  const columns = [
    {
      title: 'Ranking',
      dataIndex: 'rank',
      key: 'rank'
    },
    {
      title: 'Most Frequently Used Planes',
      dataIndex: 'plane',
      key: 'plane'
    },
    {
      title: 'Airlines with Most Routes',
      dataIndex: 'airline',
      key: 'airline'
    },
    {
      title: '# of Routes',
      dataIndex: 'routes',
      key: 'routes'
    }
  ]

  return (
    <Table columns={columns} />
  );
};

export default SummaryPanel;

