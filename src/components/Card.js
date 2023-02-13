import React from "react";
import { UserContext } from "../contexts/CurrentUserContext";

export function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const user = React.useContext(UserContext);
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = (
    `photo-card__like-button${isLiked ? ' photo-card__like-button_active': ''}`
  );


  return (
    <>
      <img
        className="photo-card__image"
        src={card.link}
        onClick={() => onCardClick(card)}
        alt={card.name}
      />
      <div className="photo-card__description">
        <h2 className="photo-card__title">{card.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={() => onCardLike(card)}
          />
          <p className="photo-card__likes">{card.likes.length}</p>
        </div>
      </div>
      {isOwn &&
        <button
          type="button"
          className="photo-card__delete-button"
          aria-label="Удалить"
          onClick={() => onCardDelete(card)}
        />
      }
    </>
  );
}