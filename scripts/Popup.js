import { resetPopup } from "./utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.remove("popup_hidden");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.add("popup_hidden");
    document.removeEventListener("keydown", this._handleEscClose);
    resetPopup();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      if (document.activeElement) {
        document.activeElement.blur();
      }
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      const target = evt.target;
      if (
        target.classList.contains("popup__close-button-icon") ||
        target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}

class PopupWithForm extends Popup {}
