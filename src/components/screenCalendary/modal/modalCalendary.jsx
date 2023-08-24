import React from "react";
import style from "./modalCalendary.module.css";

const ModalCalendary = ({ isOpen, onClose, date, modeModal }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2>{modeModal}</h2>
        <div className={style.inputContainer}>
          <div className={style.inputContainer2}>
            <label>Titulo</label>
            <input/>
          </div>
          <div className={style.inputContainer2}>
            <label>Fecha</label>
            <input value={date}/>
          </div>
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputContainer2}>
            <label>Lugar</label>
            <input/>
          </div>
          <div className={style.inputContainer2}>
            <label>Rama</label>
            <select>
              <option>Manada</option>
              <option>Scout</option>
              <option>Raider</option>
              <option>Rover</option>
            </select>
          </div>
        </div>
        <div className={style.inputContainer}>
          <div className={style.inputContainer3}>
            <label>Hora inicio</label>
            <input/>
          </div>
          <div className={style.inputContainer3}>
            <label>Hora fin</label>
            <input/>
          </div>
        </div>
        <div className={style.inputContainer2}>
          <label>Comentarios</label>
          <textarea/>
        </div>
        <div style={{display:'flex', gap:'2rem'}}>
          <button onClick={onClose} className={style.modalCloseBtn}>Cancelar</button>
          <button className={style.modalSaveBtn}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalendary;
