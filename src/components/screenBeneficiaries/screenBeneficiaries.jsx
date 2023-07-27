import React, { useEffect, useState } from "react";
import style from "./screenBeneficiaries.module.css";
import axios from "axios";
import { ImCheckboxChecked } from 'react-icons/im';
import { ImCheckboxUnchecked } from 'react-icons/im';

const ScreenBeneficiaries = () => {
  const [loading, setLoading] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [view, setView] = useState([]);

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("./beneficiaries.php");
      const data = response.data
      console.log(data)
      data.forEach(element => {
        if(element.personal_file === 1){
          element.personal_file = true
        } else element.personal_file = false

        if(element.medical_file === 1){
          element.medical_file = true
        } else element.medical_file = false
      });
      console.log(data)
      setBeneficiaries(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const info = [
    "Nombre",
    "Nacimiento",
    "telefono",
    "Fic. Personal",
    "fic. Medica",
    "Rama",
  ];

  const all = [...beneficiaries];
  const manada = all.filter((x) => x.branch === "manada");
  const scout = all.filter((x) => x.branch === "scout");
  const raider = all.filter((x) => x.branch === "raider");
  const rover = all.filter((x) => x.branch === "rover");
  const allCategory = [all, manada, scout, raider, rover];

  const branchs = [
    {
      id: 0,
      category: "Todos"
    },
    {
      id: 1,
      category: "Manada"
    },
    {
      id: 2,
      category: "Scout"
    },
    {
      id: 3,
      category: "Raider"
    },
    {
      id: 4,
      category: "Rover"
    }
  ];

  const [branch, setBranch] = useState(branchs[0]);

  function changeBranch(x) {
    setBranch(x);
    setView(allCategory[x.id]);
  }

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  useEffect(() => {
    // Una vez que los beneficiarios se han cargado, establecer la vista en todos los datos.
    setView(beneficiaries);
  
  }, [beneficiaries]);

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
              onClick={() => changeBranch(x)}
              className={`${style.branch} ${branch.id === x.id ? style.selectedBranch : ""}`}
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
          {view && view.map((x, index) => (
            <div key={x.id} className={style.dates}>
              <p className={style.date}>{x.name}</p>
              <p className={style.date}>{x.birth}</p>
              <p className={style.date}>{x.tel}</p>
              <p className={style.date}>{x.personal_file ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</p>
              <p className={style.date}>{x.medical_file ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</p>
              <p className={style.date}>{x.branch}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenBeneficiaries;



    // const beneficiaries = [
      //   {
  //     name: "Marcelo Benitez",
  //     birth: "2002-06-07",
  //     tel: "3415690470",
  //     personal_file: true,
  //     medical_file: false,
  //     branch: "rover",
  //   },
  //   {
    //     name: "Lucía López",
    //     birth: "1998-09-15",
    //     tel: "3456789012",
    //     personal_file: false,
    //     medical_file: true,
    //     branch: "manada",
    //   },
    //   {
      //     name: "Diego Martínez",
    //     birth: "1995-03-22",
    //     tel: "3501234567",
  //     personal_file: true,
  //     medical_file: true,
  //     branch: "scout",
  //   },
  //   {
  //     name: "Valentina Rodríguez",
  //     birth: "2000-11-10",
  //     tel: "3567890123",
  //     personal_file: false,
  //     medical_file: false,
  //     branch: "raider",
  //   },
  //   {
    //     name: "Sofía Fernández",
    //     birth: "1993-07-01",
    //     tel: "3590123456",
  //     personal_file: true,
  //     medical_file: true,
  //     branch: "rover",
  //   },
  // ];