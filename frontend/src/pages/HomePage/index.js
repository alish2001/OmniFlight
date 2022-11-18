import { Col, Layout, Typography, Menu, Drawer, Space, Button } from "antd";
import "./HomePage.scss";
import { SearchOutlined, StarFilled, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { IoAirplaneOutline } from "react-icons/fa";
import Map from "../../components/Map";
import SearchPanel from "../../components/SearchPanel";
import FavoritesPanel from "../../components/FavoritesPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getFilteredRoutes,
  getRoutes,
  onViewFavorites,
} from "../../api";
import {
  setFavoriteRoutes,
  setFilteredRoutes,
} from "../../state/reducers/routesReducer";
const { Content, Sider } = Layout;
const { Title, Text, Link } = Typography;

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const items = [
    getItem("0", <SearchOutlined style={{ fontSize: "25px" }} />, "Search"),
    getItem("1", <StarFilled style={{ fontSize: "25px" }} />, "Favorites"),
  ];

  const panels = [
    { title: "Search Flights", component: <SearchPanel /> },
    { title: "Favorite Flights", component: <FavoritesPanel /> },
  ];

  const [selectedPanel, setSelectedPanel] = useState(panels[0]);
  function getItem(key, icon, label) {
    return {
      key,
      icon,
      label,
    };
  }
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      let routes = await getRoutes({
        origin_city: "Toronto",
        dest_city: "",
      });
      dispatch(setFilteredRoutes({ filteredRoutes: routes.data }));
    };

    const fetchFavorites = async () => {
      let res = await onViewFavorites({ userid: user.userid });
      if (res) {
        dispatch(setFavoriteRoutes({ favoriteRoutes: res.data }));
      } else {
        console.log("There was an error getting the favorites!");
      }
    };

    fetchFavorites();
    fetchRoutes();
  }, []);

  useEffect(() => {}, []);
  const handleMenuClick = (item) => {
    setSelectedPanel(panels[item.key]);
    setOpen(true);
  };
  return (
    <Layout className="Homepage_container">
      <Sider width={"90"} theme={"light"} className={"sidebar_container"}>
        <Menu
          onClick={handleMenuClick}
          theme="light"
          mode="vertical"
          items={items}
          style={{ marginTop: "64px" }}
        />
      </Sider>
      <Drawer
        placement={"left"}
        width={500}
        onClose={onClose}
        open={open}
        mask={false}
        closable={false}
        title={selectedPanel.title}
        extra={
          <Space>
            <CloseOutlined onClick={onClose} />
          </Space>
        }
      >
        {selectedPanel.component}
      </Drawer>

      <Map />
    </Layout>
  );
};

export default HomePage;
