import React from "react";
import Entry from "./Entry";
import { Link } from 'react-router-dom'; 

function Register(props) {

  return (
    <><Entry
    userEmail={props.userEmail}
    link="/sign-in"
    navigation="Войти"
    title="Регистрация"
    name="register"
    onSubmit={props.onSubmit}
    button="Зарегиcтрироваться"
  >
     <Link className="register__link" to="/sign-in">
          Уже зарегистрированы? Войти
      </Link>  
  </Entry>
  </>
  );
}

export default Register;