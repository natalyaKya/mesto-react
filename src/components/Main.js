import React from "react";
import Card from "./Card";
import { CurrentUserContex } from "../contexts/CurrentUserContext";

export const PopupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);

function Main(props) {
  const currentUser = React.useContext(CurrentUserContex);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-conteiner" onClick={props.onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__heading">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
