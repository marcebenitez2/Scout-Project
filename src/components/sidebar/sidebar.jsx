import React, { useContext, useEffect, useState } from "react";
import style from "./sidebar.module.css";
import image from "../../assets/flordeliz.png";
import { BsPeopleFill } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from 'react-icons/ai'

import ScreenContext from "../../screenContext";

const Sidebar = () => {
  const { screenContent, setScreenContent } = useContext(ScreenContext);

  const [menuOpen, setMenuOpen] = useState(true);

  function openMenu() {
    setMenuOpen(!menuOpen);
  }

  const [sidebarItems, setsidebarItems] = useState([
    { 
      icon: <AiFillHome className={style.sidebarIcon}/> ,
      text:"Home" , 
      id: 0
    },
    {
      icon: <BsPeopleFill className={style.sidebarIcon} />,
      text: "Beneficiarios",
      id: 1,
    },
    {
      icon: <MdInventory className={style.sidebarIcon} />,
      text: "Inventario",
      id: 2,
    },
    {
      icon: <BsFillCalendarDateFill className={style.sidebarIcon} />,
      text: "Calendario",
      id: 3,
    },
    {
      icon: <TbReport className={style.sidebarIcon} />,
      text: "Planificaciones",
      id: 4,
    },
    {
      icon: <IoIosPeople className={style.sidebarIcon} />,
      text: "Reuniones",
      id: 5,
    },
  ]);

  function openItem(index) {
    const updatedItems = [...sidebarItems];
    updatedItems.forEach((item, i) => {
      if (i === index) {
        item.style = { backgroundColor: "#1472ff" };
        setScreenContent(item.id);
      } else item.style = {};
    });

    setsidebarItems(updatedItems);
  }


  return (
    <div className={style.sidebar}>
      <img src={image} className={style.sidebarLogo} />
      <div
        className={`${style.sidebarList}`}
        style={menuOpen ? { display: "flex" } : { display: "none" }}
      >
        {sidebarItems.map((item, index) => (
          <div
            className={style.sidebarItem}
            key={index}
            onClick={() => openItem(index)}
            style={item.style ? item.style : {}}
          >
            <span className={style.sidebarIcon}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <GiHamburgerMenu className={style.sidebarMenu} onClick={openMenu} />
    </div>
  );
};

export default Sidebar;
