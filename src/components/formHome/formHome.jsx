import React, { useState } from "react";
import style from "./formHome.module.css";
import axios from "axios";

const FormHome = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("tel", tel);
      params.append("mail", mail);
      params.append("message", message);

      const response = await axios.post("http://localhost/sendMessage.php", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={style.formHomeContainer}>
      <div className={style.formNameTel}>
        <div className={style.formHomeInput}>
          <p>Nombre</p>
          <input
            type="text"
            placeholder="Example: Roman Berrutti"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.formHomeInput}>
          <p>Telefono</p>
          <input
            type="tel"
            placeholder="Example: 3415690470"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
      </div>

      <div className={style.formHomeInput}>
        <p>Mail</p>
        <input
          type="email"
          placeholder="Example: roman@gmail.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div className={style.formHomeInput}>
        <p>Mensaje</p>
        <input
          type="text"
          placeholder="Hi, i need information whit...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={style.formHomeInputText}
        />
      </div>
      <button onClick={(e) => sendMessage(e)}>Enviar</button>
    </form>
  );
};

export default FormHome;
