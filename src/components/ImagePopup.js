export function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup popup_content_photo-big${isOpen ? ' popup_opened' :''}`} onMouseDown={onClose}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" aria-label="Закрыть"></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <h3 className="popup__image-caption">{card.name}</h3>
      </div>
    </div>
  );
}