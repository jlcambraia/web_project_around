import Popup from "./Popup.js";
import { resetPopup } from "./utils.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
  }

  _getInputValues() {
    const popupInputs = this._popup.querySelectorAll(".popup__input");
    const popupValues = {};

    for (let input of popupInputs) {
      popupValues[input.name] = input.value;
    }
    return popupValues;
  }

  setEventListeners() {
    super.setEventListeners();

    const form = this._popup.querySelector(".popup__form");
    const saveButton = form.querySelector(".popup__save-button");

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const popupValues = this._getInputValues();
      this._popupSubmit(popupValues, saveButton);
    });
  }

  close() {
    super.close();
    resetPopup();
  }
}
