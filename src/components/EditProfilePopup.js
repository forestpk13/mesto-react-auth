import React from 'react';
import { PopupWithForm } from "./PopupWithForm.js";
import { UserContext } from '../contexts/CurrentUserContext.js';

export function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      defaultButtonText="Сохранить"
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <label className="form__field">
          <input
            type="text"
            className="form__item"
            id="profile-name"
            name="name"
            value={name || ''}
            onChange={e => setName(e.target.value)}
            placeholder="Введите ваше имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__error_field_profile-name form__error"></span>
        </label>
        <label className="form__field">
          <input
            type="text"
            className="form__item"
            id="profile-description"
            name="about"
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
            placeholder="Укажите род деятельности"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__error_field_profile-description form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>);
}