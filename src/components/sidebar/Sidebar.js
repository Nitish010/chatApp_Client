import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Update,
  ExitToApp,
  Cancel,
  Menu,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [tog,setTog] = useState(false);
  const logout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  }
  return (
    <>
      <button className="tog" onClick={() => {setTog(!tog)}}>{tog ? <Menu/> : <Cancel/>}</button>
    <div className="sidebar">
      <div className="sidebarWrapper" style={{display: tog ? "none":""}}>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <Link to={`/messenger`} style={{textDecoration:"none"}}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>
          <Link to={`/updateProfile`} style={{textDecoration:"none"}}>
            <li className="sidebarListItem">
              <Update className="sidebarIcon" />
              <span className="sidebarListItemText">UpdateProfile</span>
            </li>
          </Link>
          
            <li className="sidebarListItem">
              <ExitToApp className="sidebarIcon" />
              <span onClick={logout} className="sidebarListItemText">Logout</span>
            </li>
          
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
