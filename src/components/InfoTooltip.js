import React from "react";
import ok from "../images/ok.svg"
import error from "../images/error.svg"

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_infoTooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_tooltip">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
        <img className="popup__image popup__image_tooltip" src={props.isRegistred ? ok : error} alt="#" />
        <span className="popup__heading popup__heading_tolltip">{props.isRegistred ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</span>
      </div>
    </div>
  );
}

export default InfoTooltip;
