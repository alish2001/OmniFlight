import React from "react";
import { loginUser } from "../../../../state/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { useState } from "react";

function Register({ setRegister, setShow }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const body = { first_name, last_name, email, password };
    console.log(body);

    Axios.post("http://localhost:8000/api/register/", body)
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
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input-container">
        {error && <p className="error-text">Incorrect Values</p>}
        <label className="input-label">First Name</label>
        <input
          className="white-input"
          type="text"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="input-label">Last Name</label>
        <input
          className="white-input"
          type="text"
          required
          onChange={(e) => setLastName(e.target.value)}
        />

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
        Register
      </button>
      <div className="center-container-row">
        <p>Have an account?</p>
        <p className="text-link" onClick={() => setRegister(false)}>
          Sign In
        </p>
      </div>
    </form>
  );
}

export default Register;
