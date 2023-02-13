import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      defaultButtonText="Сохранить"
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <label className="form__field">
          <input
            type="url"
            className="form__item"
            id="avatar-link"
            name="avatar"
            placeholder="Ссылка на аватар"
            minLength="7"
            ref={avatarRef}
            required
          />
          <span className="form__error form__error_field_avatar-link"></span>
        </label>
      </fieldset>
    </PopupWithForm>)
}