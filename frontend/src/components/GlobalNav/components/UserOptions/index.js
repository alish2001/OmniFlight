import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSignOut } from "../../../../state/actions/userActions";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import Login from "../../../Login";

import "./UserOptions.scss";

function UserOptions() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const node = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setShowUserDropdown(false);
      return;
    }
  };

  const signOut = () => {
    dispatch(userSignOut({}));
  };

  return (
    <div className="UserOptions">
      {showLogin && <Login show={showLogin} setShow={setShowLogin} />}
      <div
        onClick={() => {
          setShowUserDropdown(true);
        }}
      >
        <PersonCircle />
      </div>
      {showUserDropdown && (
        <div className="user_dropdown" ref={node}>
          {!isLoggedIn ? (
            <div>
              <div
                className="dropdown_option"
                onClick={() => {
                  setShowLogin(true);
                  setShowUserDropdown(false);
                }}
              >
                Sign in
              </div>
            </div>
          ) : (
            <div>
              <div className="dropdown_option">Account</div>
              <div
                className="dropdown_option"
                onClick={() => {
                  navigate("/orderHistory");
                  setShowUserDropdown(false);
                }}
              >
                Order History
              </div>
              <div
                className="dropdown_option sign_out"
                onClick={() => {
                  signOut();
                  setShowUserDropdown(false);
                }}
              >
                Sign out
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserOptions;
