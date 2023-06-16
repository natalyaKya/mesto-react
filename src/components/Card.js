import React from 'react';


function Card(props) {
    
    const handleClick = () => {
        props.onCardClick(props.card);
            };
 
    return (
            <div className="elements__card">
                <div className="elements__image" style={{ backgroundImage: `url(${props.link})` }} alt={props.name} onClick={() => handleClick()}></div>
                <h2 className="elements__text">{props.name}</h2>
                <button className="elements__delete"></button>
                <div className="elements__container">
                    <button className="elements__button" type="button"></button>
                    <span className="elements__likes">{props.likes.length}</span>
                </div>
            </div> 
    )
}

export default Card;