import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  return (
    <>
      <Header/>
      <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick={setSelectedCard} 
      />
      <PopupWithForm 
      name="edit-profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isEditProfilePopupOpen}
      onClose ={closeAllPopups}
      >
        <input id="name-profile" className="popup__text popup__text_type_name" type="text" name="name" required placeholder="Имя" minLength="2" maxLength="40"/>
        <span className="name-profile-error popup__text-error"></span>
        <input id="job-profile" className="popup__text popup__text_type_job" type="telxt" name="job" required placeholder="Профессия" minLength="2" maxLength="200"/>
        <span className="job-profile-error popup__text-error"></span>
      </PopupWithForm>
      <PopupWithForm 
      name="add-card" 
      title="Новое место" 
      button="Создать" 
      isOpen={isAddPlacePopupOpen}      
      onClose ={closeAllPopups}
      >
        <input id="place-card" className="popup__text popup__text_type_place" type="text" name="place" required placeholder="Название" minLength="2" maxLength="30"/>
        <span className="place-card-error popup__text-error"></span>
        <input id="link-card" className="popup__text popup__text_type_link" type="url" name="link" required placeholder="Ссылка на картинку"/>
        <span className="link-card-error popup__text-error"></span>
      </PopupWithForm>
      <PopupWithForm 
      name="confirm" 
      title="Вы уверены?" 
      button="Да"
      >
      </PopupWithForm>
      <PopupWithForm 
      name="update-avatar" 
      title="Обновить аватар" 
      button="Сохранить" 
      isOpen={isEditAvatarPopupOpen}
      onClose ={closeAllPopups}
      >
        <input id="link-avatar" className="popup__text popup__text_type_link" type="url" name="avatar" required placeholder="Ссылка на картинку"/>
        <span className="link-avatar-error popup__text-error"></span>
      </PopupWithForm>
                
      <ImagePopup card={selectedCard} onClose ={closeAllPopups}/>

      <Footer/>      
    </>
  );
}

export default App;
