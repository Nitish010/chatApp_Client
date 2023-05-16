import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import noAvatar from "../../images/person/noAvatar.png";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import likeButton from "../../images/like.png";
import heartButton from "../../images/heart.png";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const PF = "http://localhost:8000/images/";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      axios.put(
        "http://localhost:8000/api/posts/" + post._id + "/like",
        { userId: currentUser._id },
        config
      );
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `http://localhost:8000/api/users?userId=${post.userId}`,
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
  }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile`}>
              <img
                className="postProfileImg"
                src={PF + user.profilePicture || noAvatar}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.userName}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={likeButton}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={heartButton}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
