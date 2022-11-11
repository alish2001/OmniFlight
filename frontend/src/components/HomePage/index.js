import { Col, Layout, Typography } from "antd";
import React, { useState } from "react";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        width={"700"}
        style={{ background: "#ffffff" }}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Col align="center">{!collapsed && <Title>Info Panel</Title>}</Col>
      </Sider>
      <Content
        style={{
          margin: "0 16px",
        }}
      ></Content>
    </Layout>
  );
};

export default HomePage;
