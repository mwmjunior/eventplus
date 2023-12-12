import React, { useContext } from 'react';
import './PerfilUsuario.css';
import iconeLogout from "../../assets/images/icone-logout.svg";


import { UserContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const PerfilUsuario = () => {

    const { userData, setUserData} = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        // localStorage.clear();
        localStorage.removeItem("token");
        setUserData({})
        navigate("/")

    }

    return (
        <div className="perfil-usuario">
        {userData.nome ? (
          <>
            <span className="perfil-usuario__menuitem">{userData.nome}</span>
  
            <img
              onClick={logout}
              title="Deslogar"
              className="perfil-usuario__icon"
              src={iconeLogout}
              alt="imagem ilustrativa de uma porta de saída do usuário "
            />
          </>
        ) : (
          <Link to="/Login" className="perfil-usuario__menuitem">
            Login
          </Link>
        )}
  
        <span className="perfil-usuario__menuitem"></span>
      </div>
    );
  };
    

export default PerfilUsuario;