import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContex } from "../contexts/CurrentUserContext";

function EditAvatarPopup (props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }
    return (
        <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        button="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="link-avatar"
          className="popup__text popup__text_type_link"
          type="url"
          name="avatar"
          required
          placeholder="Ссылка на картинку"
          ref={avatarRef}
        />
        <span className="link-avatar-error popup__text-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;