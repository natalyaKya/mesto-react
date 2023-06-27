import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.card);
    props.onClose();
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      button="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeleteCardPopup;
