import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContex } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContex);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function HandleNameChange(e) {
    setName(e.target.value);
  }
  function HandleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-profile"
        className="popup__text popup__text_type_name"
        type="text"
        name="name"
        required
        placeholder="Имя"
        value={name || ''}
        minLength="2"
        maxLength="40"
        onChange={HandleNameChange}
      />
      <span className="name-profile-error popup__text-error"></span>
      <input
        id="job-profile"
        className="popup__text popup__text_type_job"
        type="telxt"
        name="job"
        required
        placeholder="Профессия"
        value={description  || ''}
        minLength="2"
        maxLength="200"
        onChange={HandleDescriptionChange}
      />
      <span className="job-profile-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
