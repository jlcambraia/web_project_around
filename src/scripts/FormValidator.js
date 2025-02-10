export default class FormValidator {
  constructor(configValidate, formElement) {
    this._formElement = formElement;
    this._disabledButtonClass = configValidate.disabledButtonClass;
    this._hiddenInputClass = configValidate.hiddenInputClass;
    this._redBorderInputClass = configValidate.redBorderInputClass;
    this._inputErrorMessageClass = configValidate.inputErrorMessageClass;
    this._inputs =
      Array.from(this._formElement.querySelectorAll("input")) || [];
    this._button = this._formElement.querySelector("button") || null;
  }

  _showInputError(input) {
    const errorMessage = input.parentElement.querySelector(
      `.${this._inputErrorMessageClass}`
    );
    input.classList.add(this._redBorderInputClass);
    errorMessage.classList.remove(this._hiddenInputClass);
    errorMessage.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorMessage = input.parentElement.querySelector(
      `.${this._inputErrorMessageClass}`
    );
    input.classList.remove(this._redBorderInputClass);
    errorMessage.classList.add(this._hiddenInputClass);
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
      this._button.classList.add(this._disabledButtonClass);
    } else {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._disabledButtonClass);
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
