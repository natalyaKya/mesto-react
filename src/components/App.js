import React, { useEffect } from "react";
import { useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirnDeleteCardPopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContex } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] =
    React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [currentUser, setСurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const [isCorrectRegister, setIsCorrectRegister] = React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(false);

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirm(card) {
    setIsConfirmDeleteCardPopupOpen(true);
    setSelectedCardDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(() => {
          console.log("error");
        });
    }
  }
  function handleCardDelete() {
    api
      .deleteCard(selectedCardDelete._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== selectedCardDelete._id));
      })
      .catch(() => {
        console.log("error");
      });
  }
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfoApi(name, about)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch(() => {
        console.log("error");
      });
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setСurrentUser(avatar);
        closeAllPopups();
      })
      .catch(() => {
        console.log("error");
      });
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .getNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(() => {
        console.log("error");
      });
  }
  function registerUser({password, email}) {
    auth.register({password, email})
    .then((res) => {
      if (res) {
      setIsCorrectRegister(true);
      setUserEmail(res.email);
      navigate("/sign-in", {replace: true});}
    })
    .catch(() => {
      console.log("error");
    })
    .finally(() => {
      setIsInfoTooltipPopupOpen(true);
    });
  }
  
  function authorizateUser({email, password}) {
    auth.authorization({email, password})
    .then((res) => {
      if (res.token)
      {localStorage.setItem("token", res.token);
      setloggedIn(true);
      setUserEmail(email);
      navigate("/", {replace: true});}
    })
    .catch(() => {
      setIsCorrectRegister(false);
      setIsInfoTooltipPopupOpen(true);
    });
  }
  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        setUserEmail(res.data.email);
        setloggedIn(true);
        navigate("/", {replace: true});
      })
    }
  }
  useEffect(() => {
    checkToken();
    }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        setСurrentUser(user);
      })
      .catch(() => {
        console.log("error");
      });
    }
  }, [loggedIn]);
  return (
    <CurrentUserContex.Provider value={currentUser}>
      <Routes>
      <Route path="/" element={<ProtectedRouteElement  loggedIn={loggedIn} element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirm}
            cards={cards}
            userEmail={userEmail}
      />} />
        <Route path="/sign-up" element={<Register onSubmit={registerUser}/>}/>
        <Route path="/sign-in" element={<Login onSubmit={authorizateUser} userEmail={userEmail}/>}/>
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ConfirmDeleteCardPopup
        isOpen={isConfirmDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        card={selectedCard}
      />
      <InfoTooltip 
        isOpen={isInfoTooltipPopupOpen}
        isRegistred={isCorrectRegister}
        onClose={closeAllPopups}
      />
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
      />

    </CurrentUserContex.Provider>
  );
}

export default App;
