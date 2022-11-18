import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout, Form, Input, Button, Typography, Card, Col, Row } from "antd";
import { onRegister } from "../../../api";
import React, { useState } from "react";
import { LoginOutlined } from "@ant-design/icons";

const {} = Layout;
const { Title, Text, Link } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSubmit = async (values) => {
    let res = await onRegister(values);
    res ? navigate("/login") : setError(true);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: 500 }}>
        <Col align="center" style={{ padding: "20px" }}>
          <img
            className="company_logo_big"
            src="/omniflight_logo_dark.png"
            alt="image"
          />
          {error && <Text type="danger">Register Failed!</Text>}
        </Col>
        <Form
          name="login"
          justify="center"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Row justify="center">
            <Button
              type="primary"
              shape="round"
              icon={<LoginOutlined />}
              size="large"
              htmlType="submit"
            >
              Register
            </Button>
          </Row>
        </Form>
      </Card>
    </Layout>
  );
};
export default Register;
