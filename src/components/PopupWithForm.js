export function PopupWithForm(props) {
  return (
    <div className={`popup popup_content_${props.name}${props.isOpen ? ' popup_opened' :''}`} onMouseDown={props.onClose}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        />
        <form className="form"
          id="profile"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className="button form__submit-button"
            name="profile__save"
            value="Сохранить"
          >
            {props.defaultButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}