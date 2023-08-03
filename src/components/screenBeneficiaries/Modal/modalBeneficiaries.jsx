import React, { useEffect, useState } from "react";
import style from "./modalBeneficiaries.module.css";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const ModalBeneficiaries = ({ isOpen, onClose, contenido, mode }) => {
  const [changeName, setChangeName] = useState();
  const [changeDate, setChangeDate] = useState();
  const [changeTel, setChangeTel] = useState();
  const [optionsBranch, setOptionsBranch] = useState("manada");
  const [changeMedical, setChangeMedical] = useState(false);
  const [changePersonal, setChangePersonal] = useState(false);
  const [id, setId] = useState("");
  const [change, setChange] = useState({});

  useEffect(() => {
    setChangeName(contenido.name);
    setChangeDate(contenido.birth);
    setChangeTel(contenido.tel);
    setOptionsBranch(contenido.branch);
    setChangeMedical(contenido.medical_file);
    setChangePersonal(contenido.personal_file);
    setId(contenido.id)
  }, [contenido]);

  function changeFile(x, y) {
    x(y);
  }

  function saveChange(){
    setChange(
      {
        id:id,
        name:changeName,
        birth:changeDate,
        tel:changeTel,
        branch:optionsBranch,
        personal_file:changePersonal,
        medical_file:changeMedical
      }
    )
  }

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2>{mode}</h2>
        <div className={style.inputsContainer}>
          <div className={style.inputs}>
            <input
              value={changeName || ""}
              className={style.editBeneficiarie}
              onChange={(e) => setChangeName(e.target.value)}
            />
            <input
              value={changeTel || ""}
              className={style.editBeneficiarie}
              onChange={(e) => setChangeTel(e.target.value)}
            />
          </div>
          <div className={style.inputs}>
            <input
              value={changeDate || ""}
              className={style.editBeneficiarie}
              onChange={(e) => setChangeDate(e.target.value)}
            />
            <select
              value={optionsBranch}
              className={style.editBeneficiarie}
              onChange={(e) => setOptionsBranch(e.target.value)}
            >
              <option value="manada">manada</option>
              <option value="scout">scout</option>
              <option value="raider">raider</option>
              <option value="rover">rover</option>
            </select>
          </div>
        </div>
        <div className={style.checkboxes}>
          <div>
            <span>Ficha personal: </span>
            {changePersonal ? (
              <ImCheckboxChecked
                onClick={() => changeFile(setChangePersonal, false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <ImCheckboxUnchecked
                onClick={() => changeFile(setChangePersonal, true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <div>
            <span>Ficha medica: </span>
            {changeMedical ? (
              <ImCheckboxChecked
                onClick={() => changeFile(setChangeMedical, false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <ImCheckboxUnchecked
                onClick={() => changeFile(setChangeMedical, true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        <div className={style.buttons}>
          <button className={style.modalCloseBtn} onClick={onClose}>
            Cancelar
          </button>
          <button className={style.modalSaveBtn} onClick={()=>saveChange()}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBeneficiaries;
