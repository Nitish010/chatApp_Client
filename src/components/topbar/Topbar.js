import React, { useContext, useState } from "react";
import "./topbar.css";
import { Person, Search, Chat, Notifications } from "@material-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const PF = "http://localhost:8000/images/";

const Topbar = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/search/${name}`);
    } else {
      navigate(`/search`);
    }
  };
  const { user } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Picklick</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend"
            className="searchInput"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className="searchButton" onClick={searchSubmitHandler}>
            search
          </button>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.userName}`}>
          <img src={PF + user.profilePicture} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
