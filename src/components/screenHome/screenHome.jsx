import React, { useContext, useEffect, useState } from "react";
import style from "./screenHome.module.css";
import UserContext from "../../userContext";
import { BsFillDiamondFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { fetchDataBase } from "../fetchDataBase";

const ScreenHome = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [activeNotificactions, setActiveNotificactions] = useState([]);
  const [inactiveNotifications, setInactiveNotifications] = useState([]);


  fetchDataBase(
    "http://localhost/notification.php",
    setNotifications,
    setLoading
  );

  useEffect(() => {
    setActiveNotificactions(notifications.filter((x) => x.active === "1"));
    setInactiveNotifications(notifications.filter((x) => x.active === "0"));
    console.log(notifications)
  }, [notifications]);

  const deleteNotification = (id) => {
    const updateNotificactions = notifications.filter((x) => x.id !== id);
    setNotifications(updateNotificactions);
  };

  return (
    <div className={style.screenHome}>
      <div className={style.screenHomeContainer}>
        <h1>
          Bienvenido {user ? user.charAt(0).toUpperCase() + user.slice(1) : ""}
        </h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className={style.screenHomeNotificationContainer}>
            <div>
              <p>Tienes {activeNotificactions.length} mensajes nuevos...</p>
              <div className={style.screenHomeNotification}>
                {activeNotificactions.map((x) => (
                  <div key={x.id} className={style.notificationCard}>
                    <div>
                      <div className={style.notificationCardName}>
                        <BsFillDiamondFill color="yellow" />
                        <span>{x.name}</span>
                        <TiDeleteOutline
                          color="red"
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                          onClick={() => deleteNotification(x.id)}
                        />
                      </div>
                      <p className={style.notificationCardMessage}>
                        {x.message}
                      </p>
                    </div>

                    <div className={style.notificationCardDates}>
                      <div>
                        <p>tel: {x.tel}</p>
                        <p>{x.mail}</p>
                      </div>
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {x.date.slice(5)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>Mensajes vistos...</p>
              <div className={style.screenHomeNotification}>
              {inactiveNotifications.map((x) => (
                  <div key={x.id} className={style.notificationCard}>
                    <div>
                      <div className={style.notificationCardName}>
                        <BsFillDiamondFill color="yellow" />
                        <span>{x.name}</span>
                        <TiDeleteOutline
                          color="red"
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                          onClick={() => deleteNotification(x.id)}
                        />
                      </div>
                      <p className={style.notificationCardMessage}>
                        {x.message}
                      </p>
                    </div>

                    <div className={style.notificationCardDates}>
                      <div>
                        <p>tel: {x.tel}</p>
                        <p>{x.mail}</p>
                      </div>
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {x.date.slice(5)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenHome;
