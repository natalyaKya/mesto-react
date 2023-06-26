import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContex } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setСurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    } else {
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    }
  }
  function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
    });
  }
  function handleUpdateUser({name, about}) {
    api.setUserInfoApi(name, about)
    .then((res) => {
      setСurrentUser(res);
      closeAllPopups();
    })
  }
  function handleUpdateAvatar({avatar}) {
    api.changeAvatar(avatar)
    .then((res) => {
      setСurrentUser(avatar);
      closeAllPopups();
    })
  }
  function handleAddPlaceSubmit({name,link}) {
    api.getNewCard(name,link)
    .then((res) => {
      setCards([res,...cards]);
      closeAllPopups();
    })
  }
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, user]) => {
      setCards(cards);
      setСurrentUser(user);
    })
    .catch(() => {
        console.log('error');
    })
  }, [])
  return (
    <CurrentUserContex.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        button="Да"
      ></PopupWithForm>
      
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Footer />
    </CurrentUserContex.Provider>
  );
}

export default App;