import {
  Col,
  Layout,
  Typography,
  Menu,
  Drawer,
  Space,
  Button,
  Row,
  AutoComplete,
  Input,
  Divider,
  Popconfirm,
  Popover,
  Select,
  Pagination,
} from "antd";
import {
  SearchOutlined,
  StarFilled,
  CloseOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { TbPlaneArrival } from "react-icons/tb";
import { useSelector } from "react-redux";
import "./SearchPanel.scss";
import React, { useState } from "react";
import RouteCard from "../RouteCard";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const SearchPanel = () => {
  const routes = useSelector((state) => state.routes.filteredRoutes);
  const favRoutes = useSelector((state) => state.routes.favoriteRoutes);
  return (
    <Col className="searchpanel_container">
      <Row justify="space-between">
        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          placeholder="Where from?"
        />

        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          placeholder="Where to?"
        />

        <Button icon={<SearchOutlined />} />
        <Divider />
      </Row>
      <Row justify="space-around" align="middle">
        <Select
          showSearch
          optionFilterProp="children"
          placeholder="Origin Country"
          justify="center"
          style={{ width: 150 }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "disabled",
              disabled: true,
              label: "Disabled",
            },
            {
              value: "Yiminghe",
              label: "yiminghe",
            },
          ]}
        />

        <Select
          showSearch
          optionFilterProp="children"
          placeholder="Target Country"
          justify="center"
          style={{ width: 150 }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "disabled",
              disabled: true,
              label: "Disabled",
            },
            {
              value: "Yiminghe",
              label: "yiminghe",
            },
          ]}
        />

        <Popover
          placement="bottom"
          okText="Filter"
          cancelText="Cancel"
          title="Filters"
          trigger="click"
          width={300}
        >
          <Button
            type="default"
            shape="round"
            icon={<FilterOutlined />}
            size={"medium"}
          >
            Other Filters
          </Button>
        </Popover>
      </Row>
      <Divider />
      {routes &&
        routes.map((route) => {
          return (
            <RouteCard
              key={route.routeUID}
              routeData={{
                routeUID: route.routeUID,
                origin: route.origin_city,
                origin_iata: route.origin_iata,
                destination: route.dest_city,
                destination_iata: route.dest_iata,
                airline: route.airline_name,
              }}
              isFavorite={favRoutes.some(
                (favRoute) => favRoute.routeUID === route.routeUID
              )}
            />
          );
        })}
    </Col>
  );
};

export default SearchPanel;
