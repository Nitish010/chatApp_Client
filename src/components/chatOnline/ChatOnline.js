import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
const PF = "http://localhost:8000/images/";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users/friends/${currentId}`
      );
      setFriends(res.data.friendList);
    };
    getFriends();
  }, [currentId]);
  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.some((ou) => f._id === ou.userId))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    if (setCurrentChat) {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/conversations/find/${currentId}/${user._id}`
        );
        setCurrentChat(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={PF + o.profilePicture} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.userName}</span>
        </div>
      ))}
    </div>
  );
}
