import React, { useContext, useState } from "react";
import "./updateProfile.css";
import { Cancel } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useAlert } from "react-alert";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
const PF = "http://localhost:8000/images/";

function UpdateProfle() {
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState(user.userName);
  const [file, setFile] = useState(null);

  const alert = useAlert();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUserDetails = {
      userName,
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUserDetails.profilePicture = fileName;
      console.log(newUserDetails);
      try {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        await axios.post("http://localhost:8000/api/upload", data, config);
      } catch (err) {}
    }
    try {
      await axios.put(
        `http://localhost:8000/api/users/${user._id}`,
        newUserDetails
      );
      console.log(user);
      localStorage.setItem("user", null);
      window.location.reload();
    } catch (error) {
      alert.error("userName already exists");
    }
  };
  return (
    <>
      <Topbar />
      <div className="updateContainer">
        <Sidebar />
        <div className="updateProfile">
          <div className="updateProfileHeading item">UpdateProfile</div>
          <form className="updateProfileWrapper" onSubmit={submitHandler}>
            {file && (
              <div className="updateImgContainer">
                <img
                  className="updateImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <Cancel className="CancelImg" onClick={() => setFile(null)} />
              </div>
            )}
            <img
              className="updateProfileImg item"
              src={PF + user.profilePicture}
              alt=""
            />
            <input
              type="file"
              id="file"
              className="item"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="userNameInput item">
              <span>USERNAME:</span>
              <input
                className="inputName"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
            <button className="updateProfileButton item" type="submit">
              UpdateProfile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfle;
