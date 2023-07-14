import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../userContext";
import styles from "./menu.module.css";
import Sidebar from "../../components/sidebar/sidebar";
import ScreenContext from "../../screenContext";
import ScreenHome from "../../components/screenHome/screenHome";
import ScreenInventory from "./../../components/screenInventory/screenInventory";
import ScreenCalendary from './../../components/screenCalendary/screenCalendary'
import ScreenMeeting from './../../components/screenMeeting/screenMeeting'
import ScreenPlanning from './../../components/screenPlanning/screenPlanning'
import ScreenBeneficiaries from "../../components/screenBeneficiaries/screenBeneficiaries";

const MenuPage = () => {

  const [screenContent, setScreenContent] = useState(0);

  const array = [ScreenHome,ScreenBeneficiaries,ScreenInventory,ScreenCalendary,ScreenPlanning,ScreenMeeting];

  console.log(array)

  return (
    <ScreenContext.Provider value={{ screenContent, setScreenContent }}>
      <div className={styles.menuPage}>
        <Sidebar />
        {React.createElement(array[screenContent])}
      </div>
    </ScreenContext.Provider>
  );
};

export default MenuPage;
