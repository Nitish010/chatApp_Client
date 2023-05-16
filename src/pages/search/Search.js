import React, { useContext, useEffect, useState } from "react";
import "./search.css";
import { Add, Remove } from "@material-ui/icons";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const PF = "http://localhost:8000/images/";

const Search = () => {
  const { user } = useContext(AuthContext);
  const { name } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const url = name
          ? `http://localhost:8000/api/users/search/${name}`
          : `http://localhost:8000/api/users/search`;
        const res = await axios.get(url);
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [name]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="search">
          <div className="searchWrapper">
            {users.map((u) => (
              <div className="profileCard">
                <div className="user">
                  <img
                    className="profileImg"
                    src={PF + u.profilePicture}
                    alt=""
                  />
                  <span className="profileName">{u.userName}</span>
                </div>
                <Link to={`/profile/${u.userName}`} style={{ textDecoration: "none" }}>
                  <button className="followButton">Visit Profile</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default Search;
