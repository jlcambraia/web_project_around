import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._form = this._popup.querySelector("form");
    this._inputs = Array.from(this._form.querySelectorAll("input"));
    this._button = this._form.querySelector("button");
    this._setEventListeners();
  }

  _getInputValues() {
    const popupValues = {};

    this._inputs.forEach((input) => {
      popupValues[input.name] = input.value;
    });

    return popupValues;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const popupValues = this._getInputValues();
      this._popupSubmit(popupValues);
    });
  }

  _resetForms() {
    this._form.reset();
    this._inputs.forEach((input) => {
      input.classList.remove("popup__input_type_error");
      input.nextElementSibling.classList.add("popup__input-error_hidden");
    });
  }

  close() {
    super.close();
    this._resetForms();
  }

  open() {
    super.open();

    this._button.setAttribute("disabled", true);
    this._button.classList.add("popup__save-button_disabled");
  }
}
