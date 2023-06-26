import React from "react";
import { CurrentUserContex } from "../contexts/CurrentUserContext";

function Card(props) {
  const handleClick = () => {
    props.onCardClick(props.card);
  };
  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };
  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  const currentUser = React.useContext(CurrentUserContex);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  ); 

  return (
    <div className="elements__card">
      <div
        onClick={() => handleClick()}
        className="elements__image"
        style={{ backgroundImage: `url(${props.link})` }}
      ></div>
      <h2 className="elements__text">{props.name}</h2>
      {isOwn && <button className='elements__delete' onClick={handleDeleteClick} />} 
      <div className="elements__container">
        <button 
        className={cardLikeButtonClassName}
        onClick={() => handleLikeClick()} 
        type="button"
        ></button>
        <span 
        className={"elements__likes"}
        >{props.likes.length}</span>
      </div>
    </div>
  );
}

export default Card;