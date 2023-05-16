import { Link } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("password don't match");
    } else {
      const user = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      try {
        await axios.post(
          "http://localhost:8000/api/auth/register",
          user,
          config
        );
        navigate("/login");
      } catch (error) {}
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Picklick</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Picklick.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              ref={password}
              type="password"
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              ref={passwordAgain}
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to={"/login"}>
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
