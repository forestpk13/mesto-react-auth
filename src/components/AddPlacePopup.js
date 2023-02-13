import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup({isOpen, onClose, onAddNewCard}) {
  const photoNameRef = React.useRef();
  const photoLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddNewCard({
      name: photoNameRef.current.value,
      link: photoLinkRef.current.value
    });
    photoNameRef.current.value = '';
    photoLinkRef.current.value = '';
  }

  return (
    <PopupWithForm
      defaultButtonText="Добавить"
      title="Новое место"
      name="new-photo"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fields">
        <label className="form__field">
         <input
          type="text"
          className="form__item"
          id="photo-name"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          ref={photoNameRef}
          required
        />
         <span className="form__error_field_photo-name form__error"></span>
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__item"
            id="photo-link"
            name="link"
            placeholder="Ссылка на картинку"
            ref={photoLinkRef}
            required
          />
          <span className="form__error_field_photo-link form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>)
}