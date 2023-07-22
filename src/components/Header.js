import React from "react";
import { NavLink, Link } from 'react-router-dom';
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      {props.userEmail ? 
        <div className="header__navigation">
          <span className="header__navigation_email">{props.userEmail}</span>
          <NavLink to={props.link} className={({isActive}) => `${isActive ? "header__navigation_link_active" : "header__navigation_link"}`}>{props.navigation}</NavLink>
        </div> 
        : <NavLink className="header__navigation_link" to={props.link}>{props.navigation}</NavLink>}
    </header>
  );
}

export default Header;
