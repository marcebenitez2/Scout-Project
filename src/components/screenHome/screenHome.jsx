import React, { useContext, useEffect, useState } from "react";
import style from "./screenHome.module.css";
import axios from "axios";
import UserContext from "../../userContext";
import { BsFillDiamondFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

const ScreenHome = () => {
  const [loading, setLoading] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Variable para rastrear si los datos se han cargado

  const { user } = useContext(UserContext);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("./notification.php");
      const data = response.data;
      setNotificationsCount(data.length);
      setNotifications(data);
      setLoading(false); // Los datos se han cargado, establecemos loading en false
      setDataLoaded(true); // Marcamos que los datos se han cargado completamente
    } catch (error) {
      console.log(error);
      setLoading(false); // Hubo un error, establecemos loading en false
      setDataLoaded(true); // Marcar que los datos se han cargado completamente, incluso si hay un error
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      // Este useEffect se ejecutará solo después de que los datos se hayan cargado completamente
      console.log("notificationsCount:", notificationsCount);
      console.log("notifications:", notifications);
    }
  }, [notificationsCount, notifications, dataLoaded]); // Agregamos dataLoaded como dependencia para ejecutar el useEffect solo cuando los datos estén cargados

  const deleteNotification = (id) =>{
    const updateNotificactions = notifications.filter((x)=> x.id !== id)
    setNotifications(updateNotificactions)
  }

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
            <p>Tiene {notifications.length} mensajes pendientes...</p>
            <div className={style.screenHomeNotification}>
              {notifications.map((x) => (
                <div key={x.id} className={style.notificationCard}>
                  <div>
                    <div className={style.notificationCardName}>
                      <BsFillDiamondFill color="yellow" />
                      <span>{x.name}</span>
                      <TiDeleteOutline
                        color="red"
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                        onClick={()=>deleteNotification(x.id)}
                      />
                    </div>
                    <p className={style.notificationCardMessage}>{x.message}</p>
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
        )}
      </div>
    </div>
  );
};

export default ScreenHome;