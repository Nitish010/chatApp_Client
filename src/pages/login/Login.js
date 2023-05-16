import { useContext, useEffect, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useAlert} from "react-alert"

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error, user } = useContext(AuthContext);

  const alert = useAlert();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  useEffect(() => {
    if(error){
      alert.error("invalid login details.");
    }
  }, [alert, error])
  
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
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to={"/register"} className="registerLink">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
