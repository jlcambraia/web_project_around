import Popup from "./Popup.js";

export default class PopupWithError extends Popup {
  constructor(popupSelector, messageSelector) {
    super(popupSelector);
    this._messageElement = this._popup.querySelector(messageSelector);
  }

  showError(message) {
    this._messageElement.textContent = message;
    this.open();

    setTimeout(() => {
      this.close();
    }, 3000);
  }
}
