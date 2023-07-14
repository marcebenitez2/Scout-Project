import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/login/loginPage";
import ErrorPage from "./pages/404/errorPage";
import "./App.css";
import MenuPage from "./pages/menu/menuPage";
import { useState } from "react";
import UserContext from "./userContext";

function App() {
  const [idUser, setIdUser] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);


  return (
    <UserContext.Provider value={{ idUser, user, role, setIdUser, setUser, setRole }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
