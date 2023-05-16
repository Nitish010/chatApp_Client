import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
const PF = "http://localhost:8000/images/";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users?userId=${friendId}`
        );
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [conversation.members, currentUser._id]);
  return (
    <div className="conversation">
      <img className="conversationImg" src={PF + user?.profilePicture} alt="" />
      <span className="conversationName">{user?.userName}</span>
    </div>
  );
}
