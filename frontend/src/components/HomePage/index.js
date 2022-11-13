import { Col, Layout, Typography } from "antd";
import React, { useState } from "react";
import Map from "../Map";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        width={"700"}
        style={{
          background: "#ffffff",
          position: "absolute",
          left: 0,
          zIndex: 9,
          height: "100%",
        }}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Content style={{ marginTop: "100px" }}></Content>
      </Sider>

      <Map />
    </Layout>
  );
};

export default HomePage;
