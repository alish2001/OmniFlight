import React from "react";
import Modal from "react-bootstrap/Modal";
import { loginUser } from "../../state/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";

import CompanyLogo from "../CompanyLogo";
import { useState } from "react";

import "./Login.scss";
import Register from "./components/Register";

function Login({ show, setShow }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShow(false);
    setRegister(false);
    setError(false);
  };

  const switchToRegisterModal = () => {
    setRegister(true);
    setError(false);
  };

  const onSubmit = () => {
    const body = { email, password };
    console.log(body);

    Axios.post("http://localhost:8000/api/login/", body)
      .then((response) => {
        let { id, first_name, last_name, email } = response.data;
        dispatch(
          loginUser({
            user_id: id,
            first_name,
            last_name,
            email,
          })
        );
        setShow(false);
        navigate("/");
      })
      .catch((err) => {
        setError(true);
        console.log(err.response.data);
        console.log({ ...err });
      });
  };

  return (
    <Modal
      show={show}
      onHide={() => handleModalClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="center-container-col login-container">
          <CompanyLogo size={"large"} />

          {!register ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-container">
                {error && <p className="error-text">Wrong Credentials</p>}
                <label className="input-label">Email Address</label>
                <input
                  className="white-input"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="input-label">Password</label>
                <input
                  className="white-input"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="button secondary_bg_color text_white submit-btn"
                type="submit"
                onClick={() => {
                  onSubmit();
                }}
              >
                Sign In
              </button>

              <div className="center-container-row">
                <p>Not a member?</p>
                <p
                  className="text-link"
                  onClick={() => switchToRegisterModal()}
                >
                  Create Account
                </p>
              </div>
            </form>
          ) : (
            <Register setRegister={setRegister} setShow={setShow} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
