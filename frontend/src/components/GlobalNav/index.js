import React, { useState, useEffect, useRef } from "react";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

//Components
import CompanyLogo from "../CompanyLogo";
import UserOptions from "./components/UserOptions";

import "./GlobalNav.scss";

function GlobalNav() {
  let active_nav = {};
  const node = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    nav_options.forEach((nav) => {
      active_nav[nav.id] = false;
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setShowSearch(false);
      return;
    }
  };

  const [activeOption, setActiveOption] = useState(active_nav);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
      setShowSearch(false);
    }
  };

  return (
    <div className="GlobalNav">
      <div className="gradient-animation Gradient_Cont"></div>
      <div className="Nav_Container primary_bg_color">
        <div className="nav_content elements_container">
          <div
            className="logo"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <CompanyLogo mode="light" size="large" />
          </div>

          <div className="user_actions">
            <div
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <Search />
            </div>
            <UserOptions />
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="Search_Container bg_grey_500" ref={node}>
          <div className="search_input elements_container">
            <Search />
            <input
              autoFocus
              className="empty_input text_white"
              placeholder="Search"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={searchQuery}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalNav;
