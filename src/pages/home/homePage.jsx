import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormHome from "../../components/formHome/formHome";
import style from './homePage.module.css'

const HomePage = () => {
  return (
    <div className={style.homePage}>
      <h1>Bienvenido al grupo scout San Miguel de Arcangel</h1>

      <p>
        <Link to={"/login"}>Clickeame</Link>
      </p>

      <FormHome />
    </div>
  );
};

export default HomePage;
