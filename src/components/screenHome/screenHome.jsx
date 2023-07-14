import React from "react";
import style from "./screenHome.module.css";

const ScreenHome = ({ name }) => {
  return (
    <div className={style.screenHome}>
      <div className={style.screenHomeContainer}>
        <h1>
          Bienvenido {name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}
        </h1>
        <p>Tiene x mensajes pendientes</p>
        <div className={style.screenHomeNotification}>
          
        </div>
      </div>
    </div>
  );
};

export default ScreenHome;
