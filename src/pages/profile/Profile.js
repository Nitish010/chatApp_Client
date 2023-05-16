import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PF = "http://localhost:8000/images/";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `http://localhost:8000/api/users?username=${username}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      setUser(data.user);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + "16174672861673.jpeg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={PF + user.profilePicture}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.userName}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userName={user.userName} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
