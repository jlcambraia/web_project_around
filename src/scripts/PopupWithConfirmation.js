import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._setEventListeners();
  }

  submitConfirm(confirmAction) {
    this._confirmAction = confirmAction;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupSubmit.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (this._confirmAction) {
        this._confirmAction();
      }
      this.close();
    });
  }
}
