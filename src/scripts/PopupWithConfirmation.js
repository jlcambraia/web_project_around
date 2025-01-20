import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(submitSelector);
    this._handleConfirm = null;
  }

  setHandleConfirm(confirm) {
    this._handleConfirm = confirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }
}
