import React from "react";
import Entry from "./Entry";

function Login(props) {
  return (
        <Entry          
          userEmail={props.userEmail}
          link="/sign-up"
          navigation="Регистрация"
          title="Вход"
          name="login"
          onSubmit={props.onSubmit}
          button="Войти"
        />
  );
}

export default Login;