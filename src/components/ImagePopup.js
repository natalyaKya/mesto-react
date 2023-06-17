import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_full-size ${
        card.name ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={() => onClose()}
        ></button>
        <div className="popup__form-full-size" name="popup">
          <figure className="popup__box">
            <img className="popup__image" src={card.link} alt={card.name}></img>
            <figcaption className="popup__caption"> {card.name} </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;