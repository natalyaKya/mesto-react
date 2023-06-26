import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-card"
        className="popup__text popup__text_type_place"
        type="text"
        name="place"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={cardNameRef}
      />
      <span className="place-card-error popup__text-error"></span>
      <input
        id="link-card"
        className="popup__text popup__text_type_link"
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
        ref={cardLinkRef}
      />
      <span className="link-card-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
