import React, { useEffect, useState } from "react";
import style from "./screenCalendary.module.css";
import Calendar from "react-calendar";
import "./calendario.css";
import ModalCalendary from "./modal/modalCalendary";

const ScreenCalendary = () => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setmodalOpen] = useState(false);
  const [modeModal, setmodeModal] = useState('');
  

  const selectDate = (date) => {
    setDate(date.toLocaleDateString("es-AR"));
  };

  const handleOpenModal = (x) => {
    setmodalOpen(true);
    setmodeModal(x)
  };

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  return (
    <div className={style.screenCalendary}>
      <div className={style.screenCalendaryContainer}>
        <h1>Calendario</h1>
        <div className={style.CalendaryAndToDo}>
          <div className={style.calendaryContainer}>
            <Calendar
              onClickDay={selectDate}
              value={date}
              className={style.calendary}
            />
            <button onClick={()=>handleOpenModal('Nuevo evento')}>Agregar evento</button>
          </div>
          <div className={style.toDoContainer}>
            <h1>Actividades</h1>
          </div>
        </div>
      </div>
      <ModalCalendary isOpen={modalOpen} onClose={handleCloseModal} date={date} modeModal={modeModal}/>
    </div>
  );
};

export default ScreenCalendary;
