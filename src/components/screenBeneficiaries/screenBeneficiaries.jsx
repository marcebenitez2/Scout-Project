import { useEffect, useState } from "react";
import style from "./screenBeneficiaries.module.css";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import ModalBeneficiaries from "./Modal/modalBeneficiaries";
import { fetchDataBase } from "../fetchDataBase";
import { info, branchs } from "./arrays";

const ScreenBeneficiaries = () => {
  const [loading, setLoading] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [copy, setCopy] = useState([]);
  const [view, setView] = useState([]);
  const [actualBranch, setActualBranch] = useState([]);
  const [allBranch, setallBranch] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [beneficieEdit, setBeneficieEdit] = useState({});
  const [modeModal, setmodeModal] = useState("");
  const [search, setSearch] = useState();
  let allBeneficiaries;
  let manada;
  let scout;
  let raider;
  let rover;

  useEffect(() => {
    console.log(beneficiaries);
    convertBool();
    setCopy(beneficiaries);
  }, [beneficiaries]);

  useEffect(() => {
    createrFilter();
    setallBranch([allBeneficiaries, manada, scout, raider, rover]);
    setActualBranch(allBeneficiaries);
    setView(copy);
  }, [copy]);

  useEffect(() => {
    if (search !== "") {
      setView(
        copy.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
      );
      setActualBranch(allBranch[0]);
    } else {
      setView(copy);
    }
  }, [search]);

  fetchDataBase(
    "http://localhost/beneficiaries.php",
    setBeneficiaries,
    setLoading
  );

  function convertBool() {
    beneficiaries.forEach((element) => {
      if (element.personal_file === "1") {
        element.personal_file = true;
      } else element.personal_file = false;

      if (element.medical_file === "1") {
        element.medical_file = true;
      } else element.medical_file = false;

      if (element.active === "1") {
        element.active = true;
      } else element.active = false;
    });
  }

  function changeBranch(x) {
    setView(allBranch[x]);
    setActualBranch(allBranch[x]);
  }

  function createrFilter() {
    allBeneficiaries = [...copy];
    manada = copy.filter((x) => x.branch === "manada");
    scout = copy.filter((x) => x.branch === "scout");
    raider = copy.filter((x) => x.branch === "raider");
    rover = copy.filter((x) => x.branch === "rover");
  }

  let beneficiarie = {
    id: copy.length + 1,
    birth: "",
    branch: "",
    medical_file: "",
    name: "",
    personal_file: "",
    tel: "",
  };

  const handleOpenModal = (x, y) => {
    setModalOpen(true);
    setBeneficieEdit(x);
    setmodeModal(y);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.screenBeneficiaries}>
      <div className={style.screenBeneficiariesContainer}>
        <h1>Beneficiarios</h1>
        <button
          className={style.addBtn}
          onClick={() => handleOpenModal(beneficiarie, "Añadir")}
        >
          Añadir
        </button>
        <div className={style.screenBeneficiariesBranchs}>
          {branchs.map((x) => (
            <span
              key={x.id}
              onClick={() => changeBranch(x.id)}
              className={`${style.branch} ${
                actualBranch === allBranch[x.id] ? style.selectedBranch : ""
              }`}
            >
              {x.category}
            </span>
          ))}
        </div>
        <input
          placeholder="Nombre"
          className={style.search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={style.screenBeneficiariesList}>
          <div className={style.infos}>
            {info.map((x) => (
              <span key={x} className={style.info}>
                {x}
              </span>
            ))}
          </div>
          {view &&
            view.map((x) => (
              <div key={x.id} className={style.dates}>
                <p className={style.date}>{x.name}</p>
                <p className={style.date}>{x.birth}</p>
                <p className={style.date}>{x.tel}</p>
                <p className={style.date} style={{textAlign:'center'}}>
                  {x.personal_file ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </p>
                <p className={style.date} style={{textAlign:'center'}}>
                  {x.medical_file ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </p>
                <p className={style.date} style={{textAlign:'center'}}>{x.branch}</p>
                <p className={style.date} style={{textAlign:'center'}}>
                  {x.active ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </p>
                <FiEdit3
                  onClick={() => handleOpenModal(x, "Editar")}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  className={style.date}
                />
              </div>
            ))}
        </div>
        <span
          style={{ fontSize: "19px", fontWeight: "500", marginTop: "1rem",textAlign:'center' }}
        >
          <span style={{ color: "#1472ff",fontWeight: "900" }}>IMPORTANTE: </span>los cambios se
          veran luego de recargar la pagina
        </span>
      </div>
      <ModalBeneficiaries
        isOpen={modalOpen}
        onClose={handleCloseModal}
        contenido={beneficieEdit}
        mode={modeModal}
      />
    </div>
  );
};

export default ScreenBeneficiaries;