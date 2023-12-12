import React, { useContext } from "react";
import "./LoginPage.css";
import logo from "../../assets/images/logo-pink.svg";
import ImageIllustrator from "../../components/ImageIlustrator/ImageIlustrator";
import loginImage from "../../assets/images/login.svg";
import { useState } from "react";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api ,{loginResources} from "../../Services/Service"
import {UserContext, userDecodeToken } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "junior@gmail.com", senha: "" });
  const{userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (userData.nome) navigate("/")
  }, [userData]);


  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email.length > 3 && user.senha.length > 3) {
      try {
        const promise = await api.post(loginResources, { email: user.email, senha: user.senha });

        // console.log("Dados do usuario");
        // console.log(promise.data);

        const userFullToken = userDecodeToken(promise.data.token)
        setUserData(userFullToken) // guarda token globalmente 

        localStorage.setItem("token", JSON.stringify(userFullToken));
          navigate("/"); // envia o usuario para a home
        


      } catch (error) {
        //erro da api
        console.log(error);
        alert("verifique os dados e a conexao com a internet")
      }
    } else {
      alert("preencha os dados corretamente");
    }
    console.log(user);
  }


    console.log("dados de login");
    console.log ()

  
  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              className="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              fnManipulator={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }}
              placeholder="Username"
            />
            <Input
              className="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              fnManipulator={(e) => {
                setUser({ ...user, senha: e.target.value.trim() });
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
              fnManipulator={() => {}}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
