import React from "react";
import { api } from "../utils/api";
import Card from "./Card";

export const PopupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-conteiner" onClick={props.onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__heading">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__text">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={props.onCardClick}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;