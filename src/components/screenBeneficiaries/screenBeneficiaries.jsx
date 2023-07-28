import { useEffect, useState } from "react";
import style from "./screenBeneficiaries.module.css";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const ScreenBeneficiaries = () => {
  const [loading, setLoading] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [copy, setCopy] = useState([]);
  const [view, setView] = useState([]);
  const [actualBranch, setActualBranch] = useState([]);
  let allBeneficiaries
  let manada 
  let scout
  let raider
  let rover
  let allBranch

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("./beneficiaries.php");
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

  function createrFilter(){
    allBeneficiaries = [...copy]
    manada = copy.filter((x)=>x.branch === "manada")
    scout = copy.filter((x)=>x.branch === "scout")
    raider = copy.filter((x)=>x.branch === "raider")
    rover = copy.filter((x)=>x.branch === "rover")
    allBranch = [allBeneficiaries,manada,scout,raider,rover]
  }

  function changeBranch(x){
    setView(allBranch[x])
  }


  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  useEffect(() => {
    setCopy(beneficiaries)
  }, [beneficiaries]);

  useEffect(() => {
    createrFilter()
    setView(copy)
    setActualBranch(allBeneficiaries)
  }, [copy]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.screenBeneficiaries}>
      <div className={style.screenBeneficiariesContainer}>
        <h1>Beneficiarios</h1>
        <div className={style.screenBeneficiariesBranchs}>
          {branchs.map((x) => (
            <span
              key={x.id}
              onClick={() => changeBranch(x.id)}
              // className={`${style.branch} ${
              //   actualBranch === x.id ? style.selectedBranch : ""
              // }`}
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
                <p
                  className={style.date}
                  // onClick={() => changeFile(x.id, "personal_file")}
                >
                  {x.personal_file ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </p>
                <p
                  className={style.date}
                  // onClick={() => changeFile(x.id, "medical_file")}
                >
                  {x.medical_file ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </p>
                <p className={style.date}>{x.branch}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenBeneficiaries;

//   const beneficiaries = [
//     {
//   name: "Marcelo Benitez",
//   birth: "2002-06-07",
//   tel: "3415690470",
//   personal_file: true,
//   medical_file: false,
//   branch: "rover",
// },
// {
//     name: "Lucía López",
//     birth: "1998-09-15",
//     tel: "3456789012",
//     personal_file: false,
//     medical_file: true,
//     branch: "manada",
//   },
//   {
//       name: "Diego Martínez",
//     birth: "1995-03-22",
//     tel: "3501234567",
//   personal_file: true,
//   medical_file: true,
//   branch: "scout",
// },
// {
//   name: "Valentina Rodríguez",
//   birth: "2000-11-10",
//   tel: "3567890123",
//   personal_file: false,
//   medical_file: false,
//   branch: "raider",
// },
// {
//     name: "Sofía Fernández",
//     birth: "1993-07-01",
//     tel: "3590123456",
//   personal_file: true,
//   medical_file: true,
//   branch: "rover",
// },
// ];
