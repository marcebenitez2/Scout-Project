import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>
        <Link to={"/login"}>Clickeame</Link>
      </h1>
    </div>
  );
};

export default HomePage;
