import React from "react";
import style from "./modalConfirm.module.css";
import postDataBase from "../postDataBase";

const ModalConfirm = ({ isOpen, onClose, toConfirm }) => {
  function saveChange(toConfirm) {
    toConfirm.active = 0;
    toConfirm.id = parseInt(toConfirm.id);
    postDataBase(toConfirm, "http://localhost/toConfirm.php");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h1>Confirmar cambio</h1>
        <div className={style.btns}>
          <button className={style.cancel} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={style.confirm}
            onClick={() => saveChange(toConfirm)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
