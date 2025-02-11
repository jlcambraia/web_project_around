export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.remove("popup_hidden");
  }

  close() {
    this._popup.classList.add("popup_hidden");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popup.classList.add("popup_hidden");
    }
  }

  _setEventListeners() {
    this._closeButtons = document.querySelectorAll(".popup__close-button");
    this._closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
      const pressedButton = evt.target.closest("button");
      if (pressedButton) {
        pressedButton.blur();
      }
    });
  }
}
