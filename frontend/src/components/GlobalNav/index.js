import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import React, { useState } from "react";

const { Header } = Layout;
const { Text, Link } = Typography;

const GlobalNav = () => {
  const user = useSelector((state) => state.user);

  const items = [
    getItem(user.first_name + " " + user.last_name, "sub1", <UserOutlined />, [
      getItem("My Account", "1"),
    ]),
  ];

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  return (
    <Header className="header">
      <Row justify="space-between">
        <div style={{ fontSize: "25px", color: "white" }}>Omniflight</div>
        <Menu theme="dark" mode="horizontal" items={items} />
      </Row>
    </Header>
  );
};

export default GlobalNav;
