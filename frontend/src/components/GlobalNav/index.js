import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Row, Typography, Col } from "antd";
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
    <Header
      className="header"
      style={{ position: "absolute", top: 0, zIndex: 10, width: "100%" }}
    >
      <Row justify="space-between">
        <Col>
          <img
            className="company_logo"
            src="/omniflight_logo.png"
            alt="image"
          />
        </Col>
        <Menu theme="dark" mode="horizontal" items={items} />
      </Row>
    </Header>
  );
};

export default GlobalNav;
