import { useEffect, useState } from "react";
import style from "./screenBeneficiaries.module.css";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import ModalBeneficiaries from "./Modal/modalBeneficiaries";

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
  let allBeneficiaries;
  let manada;
  let scout;
  let raider;
  let rover;

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("http://localhost/beneficiaries.php");
      const data = response.data;
      data.forEach((element) => {
        if (element.personal_file === "1") {
          element.personal_file = true;
        } else element.personal_file = false;

        if (element.medical_file === "1") {
          element.medical_file = true;
        } else element.medical_file = false;
      });
      setBeneficiaries(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Cada categoria de la lista
  const info = [
    "Nombre",
    "Nacimiento",
    "telefono",
    "Fic. Personal",
    "fic. Medica",
    "Rama",
    "Editar",
  ];

  // Cada rama para renderizarlas
  const branchs = [
    {
      id: 0,
      category: "Todos",
    },
    {
      id: 1,
      category: "Manada",
    },
    {
      id: 2,
      category: "Scout",
    },
    {
      id: 3,
      category: "Raider",
    },
    {
      id: 4,
      category: "Rover",
    },
  ];

  function createrFilter() {
    allBeneficiaries = [...copy];
    manada = copy.filter((x) => x.branch === "manada");
    scout = copy.filter((x) => x.branch === "scout");
    raider = copy.filter((x) => x.branch === "raider");
    rover = copy.filter((x) => x.branch === "rover");
  }

  function changeBranch(x) {
    setView(allBranch[x]);
    setActualBranch(allBranch[x]);
  }

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  useEffect(() => {
    setCopy(beneficiaries);
  }, [beneficiaries]);

  useEffect(() => {
    createrFilter();
    setallBranch([allBeneficiaries, manada, scout, raider, rover]);
    setActualBranch(allBeneficiaries);
    setView(copy);
  }, [copy]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  let beneficiarie = {
    id:copy.length + 1,
    birth: '', 
    branch: '',
    medical_file: '',
    name: '',
    personal_file: '',
    tel: '',
  }

  const handleOpenModal = (x,y) => {
    setModalOpen(true);
    console.log(x);
    setBeneficieEdit(x);
    setmodeModal(y)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <div className={style.screenBeneficiaries}>
      <div className={style.screenBeneficiariesContainer}>
        <h1>Beneficiarios</h1>
        <button className={style.addBtn} onClick={()=>handleOpenModal(beneficiarie,"Añadir")}>Añadir</button>
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
                <p className={style.date}>
                  {x.personal_file ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </p>
                <p className={style.date}>
                  {x.medical_file ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </p>
                <p className={style.date}>{x.branch}</p>
                <FiEdit3
                  onClick={() => handleOpenModal(x,"Editar")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>
      </div>
      <ModalBeneficiaries
        isOpen={modalOpen}
        onClose={handleCloseModal}
        contenido={beneficieEdit}
        mode={modeModal}
      >
        <h2>Título del Modal</h2>
        <p>Contenido del modal...</p>
      </ModalBeneficiaries>
    </div>
  );
};

export default ScreenBeneficiaries;
