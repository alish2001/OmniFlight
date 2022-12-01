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
  Form,
} from "antd";
import {
  SearchOutlined,
  StarFilled,
  CloseOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { TbPlaneArrival } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import "./SearchPanel.scss";
import React, { useState } from "react";
import RouteCard from "../RouteCard";
import { useEffect } from "react";
import debounce from "lodash/debounce";
import {
  getCountries,
  getCities,
  getAirlines,
  getFilteredRoutes,
  getRoutes,
} from "../../api";
import { setFilteredRoutes } from "../../state/reducers/routesReducer";
import { set } from "lodash";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const SearchPanel = () => {
  let dispatch = useDispatch();
  const routes = useSelector((state) => state.routes.filteredRoutes);
  const favRoutes = useSelector((state) => state.routes.favoriteRoutes);

  useEffect(() => {}, [routes]);

  const [cities, setCities] = useState();
  const [countries, setCountries] = useState();
  const [airlines, setAirlines] = useState();

  const [origin_city, setOriginCity] = useState("");
  const [dest_city, setDestCity] = useState("");
  const [origin_city_options, setOriginCityOptions] = useState(cities);
  const [dest_city_options, setDestCityOptions] = useState(cities);

  useEffect(() => {
    const fetchData = async () => {
      let cities = await getCities();
      let countries = await getCountries();
      let airlines = await getAirlines();

      setCities(cities.data);
      setCountries(countries.data);
      setAirlines(airlines.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setDestCityOptions(cities);
    setOriginCityOptions(cities);
  }, [cities]);

  const onSearch = async () => {
    let routes = await getRoutes({ origin_city, dest_city });

    console.log(routes);
    dispatch(setFilteredRoutes({ filteredRoutes: routes.data }));
  };

  const onFilter = async (values) => {
    let routes = await getFilteredRoutes({ ...values, origin_city, dest_city });
    console.log(routes.data);

    console.log(routes);
    dispatch(setFilteredRoutes({ filteredRoutes: routes.data }));
  };

  const content = (
    <Form
      name="login"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        origin_country: "",
        dest_country: "",
        airline_name: "",
        airplane_type: "",
      }}
      autoComplete="on"
      onFinish={onFilter}
    >
      <Form.Item
        label="Origin Country"
        name="origin_country"
        justify="center"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={countries && countries}
        />
      </Form.Item>

      <Form.Item
        label="Target Country"
        name="dest_country"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={countries && countries}
        />
      </Form.Item>
      <Form.Item
        label="Airline"
        name="airline_name"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={airlines && airlines}
        />
      </Form.Item>
      <Form.Item
        label="Airplane Type"
        name="airplane_type"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <AutoComplete style={{ width: 200, fontSize: 15 }} />
      </Form.Item>
      <Row justify="center">
        <Button type="primary" icon={<FilterOutlined />} htmlType="submit">
          Apply filter
        </Button>
      </Row>
    </Form>
  );
  return (
    <Col className="searchpanel_container">
      <Row justify="space-between">
        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          value={origin_city}
          onChange={(data) => setOriginCity(data)}
          placeholder="Where from?"
          onSearch={debounce((searchText) => {
            setOriginCityOptions(
              !searchText
                ? cities
                : cities.filter((option) =>
                    option.value
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
            );
          }, 500)}
          options={origin_city_options && origin_city_options}
        />

        <AutoComplete
          style={{ width: 200, fontSize: 15 }}
          value={dest_city}
          onChange={(data) => setDestCity(data)}
          placeholder="Where to?"
          onSearch={debounce((searchText) => {
            setDestCityOptions(
              !searchText
                ? cities
                : cities.filter((option) =>
                    option.value
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
            );
          }, 500)}
          options={dest_city_options && dest_city_options}
        />

        <Divider />
      </Row>
      <Row justify="space-around" align="middle">
        <Popover
          placement="bottom"
          okText="Filter"
          cancelText="Cancel"
          title="Filters"
          trigger="click"
          width={300}
          content={content}
        >
          <Button
            type="default"
            shape="round"
            icon={<FilterOutlined />}
            size="large"
          >
            Route Filters
          </Button>
        </Popover>
        <Button
          type="primary"
          shape="round"
          icon={<SearchOutlined />}
          size="large"
          onClick={() => onSearch()}
        >
          Search routes
        </Button>
      </Row>
      <Divider />
      {routes &&
        routes.map((route) => {
          return (
            <RouteCard
              key={
                route.routeUID +
                (route.airplane_name ? route.airplane_name : "")
              }
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
