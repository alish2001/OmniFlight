import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import {
  Layout,
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Row,
  Card,
  Col,
} from "antd";
import { onLogin } from "../../api";
import React, { useState } from "react";
import { login } from "../../state/reducers/userReducer";

const {} = Layout;
const { Title, Text, Link } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSubmit = async (values) => {
    let res = await onLogin(values);
    if (res) {
      let { userid, first_name, last_name, email } = res.data;
      dispatch(
        login({
          userid,
          first_name,
          last_name,
          email,
        })
      );
      setError(false);
      navigate("/");
    } else {
      setError(true);
    }
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
        <Col align="center">
          <Title>Omniflight</Title>
          {error && <Text type="danger">Login Failed!</Text>}
        </Col>
        <Form
          name="login"
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
            label="Email"
            name="email"
            justify="center"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
              Sign in
            </Button>
          </Row>
        </Form>
        <Row justify="center">
          <Divider />
          <Text>
            Don't have an account?{" "}
            <Link onClick={() => navigate("/register")}>Register</Link>
          </Text>
        </Row>
      </Card>
    </Layout>
  );
};
export default Login;
