import Popup from "./Popup.js";

export default class PopupWithError extends Popup {
  constructor(popupSelector, errorMessageContainer) {
    super(popupSelector);
    this._errorMessage = this._popup.querySelector(errorMessageContainer);
  }

  showError(message) {
    this._errorMessage.textContent = message;
    this.open();

    setTimeout(() => {
      this.close();
    }, 3000);
  }
}
