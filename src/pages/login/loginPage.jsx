import React, { useContext, useState } from "react";
import style from "./loginPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../userContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const {setIdUser , setUser, setRole  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost/login.php", {
        username: username,
        password: password,
      });
      const data = response.data;
      console.log(data)
  
      if (data.startsWith("Success")) {
        const [, idUser, username, rol] = data.split("|");
        setIdUser(idUser);
        setUser(username);
        setRole(rol);
        goToMenu();
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setError("Error de conexión");
    }
  };
  const navigate = useNavigate()

  function goToMenu(){
    navigate("/menu")
  }

  return (
    <>
      <div className={style.loginContainer}>
        <div className={style.loginCard}>
          <h3>Login</h3>
          <div className={style.loginCardForm}>
            <div className={style.loginCardInput}>
              <span>Nombre de usuario:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={style.loginCardInput}>
              <span>Contraseña:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className={style.loginCardButton} onClick={handleSubmit}>
            Iniciar sesión
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
