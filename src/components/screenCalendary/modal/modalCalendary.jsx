import React from "react";
import style from "./modalCalendary.module.css";

const ModalCalendary = ({ isOpen, onClose, date, modeModal }) => {
  if (!isOpen) return null;

  console.log("asd");

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2>{modeModal}</h2>

        <div className={style.modalContainer}>
          <div className={style.labelAndInput}>
            <div>
              <label>Titulo</label>
              <input />
            </div>
            <div>
              <label>Fecha</label>
              <input defaultValue={date} />
            </div>
          </div>

          <div className={style.labelAndInput}>
            <div>
              <label>Hora inicio</label>
              <input />
            </div>
            <div>
              <label>Hora fin</label>
              <input />
            </div>
          </div>

          <div className={style.labelAndInput}>
            <div>
              <label>Lugar</label>
              <input />
            </div>
            <div>
              <label>Comentario</label>
              <textarea/>
            </div>
          </div>


        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <button onClick={onClose} className={style.modalCloseBtn}>
            Cancelar
          </button>
          <button className={style.modalSaveBtn}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalendary;
