import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
        <form
          className="popup__form popup__form-edit-profile"
          name={props.name}
          noValidate
        >
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
          <button
            className={`popup__button popup__button-${props.name} popup__button-load`}
            type="submit"
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;