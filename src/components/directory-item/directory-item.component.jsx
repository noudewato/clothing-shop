import React from "react";
import "./directory.styles.scss";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();

  const { imageUrl, title, route } = category;
  const navigateHandler = () => navigate(route);
  return (
    <div className="directory-item-container" onClick={navigateHandler}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <p>{title}</p>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
