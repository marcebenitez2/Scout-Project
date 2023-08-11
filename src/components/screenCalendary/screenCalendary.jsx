import React from "react";
import style from "./screenCalendary.module.css";
import Calendar from "react-calendar";
import './calendario.css';


const ScreenCalendary = () => {
  return (
    <div className={style.screenCalendary}>
      <div className={style.screenCalendaryContainer}>
        <h1>Calendario</h1>
        <div className={style.CalendaryAndToDo}>
          <div className={style.calendaryContainer}>
            <Calendar className={style.calendary} />
          </div>
          <div className={style.toDoContainer}>
            <h1>Actividades</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenCalendary;
