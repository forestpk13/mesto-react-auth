import { PopupWithForm } from "./PopupWithForm";

export function PopupWithConfirmation({isOpen, onClose, onConfirmRemove}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmRemove();
  }

  return (
    <PopupWithForm
      defaultButtonText="Да"
      title="Вы уверены?"
      name="confirmation"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />)
}