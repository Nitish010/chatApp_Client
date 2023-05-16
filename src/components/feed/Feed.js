import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userName }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = userName
        ? `http://localhost:8000/api/posts/profile/${userName}`
        : `http://localhost:8000/api/posts/timeline/${user._id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setPosts(
        data.posts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user._id, userName]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!userName || userName === user.userName) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
