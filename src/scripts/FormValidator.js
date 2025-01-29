export default class FormValidator {
  constructor(configValidation, formElement) {
    this._formElement = formElement;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._errorClassHidden = configValidation.errorClassHidden;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._inputErrorMessageClass = configValidation.inputErrorMessageClass;
    this._inputs =
      Array.from(this._formElement.querySelectorAll("input")) || [];
    this._button = this._formElement.querySelector("button") || null;
  }

  _showInputError(input) {
    const errorMessage = input.parentElement.querySelector(
      `.${this._inputErrorMessageClass}`
    );
    input.classList.add(this._inputErrorClass);
    errorMessage.classList.remove(this._errorClassHidden);
    errorMessage.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorMessage = input.parentElement.querySelector(
      `.${this._inputErrorMessageClass}`
    );
    input.classList.remove(this._inputErrorClass);
    errorMessage.classList.add(this._errorClassHidden);
    errorMessage.textContent = "";
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _changeButtonState() {
    const isInputValid = this._inputs.every((input) => input.validity.valid);
    if (!isInputValid) {
      this._button.setAttribute("disabled", true);
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListener() {
    this._inputs.forEach((input) =>
      input.addEventListener("input", () => {
        this._isValid(input);
        this._changeButtonState();
      })
    );
  }

  enableValidation() {
    this._setEventListener();
  }
}
