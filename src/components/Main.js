import React from 'react';
import { Card } from './Card.js';
import { LoadingScreen } from './LoadingScreen.js';
import { UserContext } from '../contexts/CurrentUserContext.js';

export function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, loadingScreenStatus}) {
  const user = React.useContext(UserContext);

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-wrapper">
          <img className="profile__avatar" src={user.avatar} alt="Аватар пользователя" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать"></button>
          <p className="profile__description">{user.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardElement) => {
            return (
              <li className="photo-card" key={cardElement._id}>
                <Card
                  card={cardElement}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <LoadingScreen isClose={loadingScreenStatus} />

    </main>
  );
}