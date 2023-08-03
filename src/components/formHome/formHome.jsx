import React, { useState } from "react";
import style from "./formHome.module.css";
import postDataBase from "./../postDataBase";

const FormHome = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("name", name);
    params.append("tel", tel);
    params.append("mail", mail);
    params.append("message", message);

    postDataBase(params,"http://localhost/sendMessage.php");
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
      <button onClick={handleSubmit}>Enviar</button>
    </form>
  );
};

export default FormHome;
