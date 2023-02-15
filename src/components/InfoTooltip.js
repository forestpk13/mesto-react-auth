import failureImg from '../images/failure.svg';
import successImg from '../images/success.svg';

export function InfoTooltip(props) {
  const toolTipText = props.isError ? props.errorMessage : "Вы успешно зарегистрировались!";
  const imgStyle = { backgroundImage: `url(${props.isError ? failureImg : successImg})` };

  return (
    <div className={`popup popup_content_info-tooltip${props.isOpen ? ' popup_opened' :''}`} onMouseDown={props.onClose}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        />
        <div className="popup__tooltip-img" style={imgStyle} />
        <p className="popup__tooltip-message">{toolTipText}</p>
      </div>
    </div>)
}