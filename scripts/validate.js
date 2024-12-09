// Função principal para habilitar validação
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = errorMessage;
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = "";
  };

  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const hasInvalidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    if (hasInvalidInput) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// Função para resetar as informações do popup para não aparecer a mensagem de erro quando fechar e abrir o popup novamente
const resetForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll("input"));
  inputList.forEach((inputElement) => {
    inputElement.value = "";
    inputElement.classList.remove("popup__input_type_error");
  });

  const errorList = Array.from(
    formElement.querySelectorAll(".popup__input-error")
  );
  errorList.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.add("popup__input-error_hidden");
  });

  const buttonElement = formElement.querySelector(".popup__save-button");
  buttonElement.classList.add("popup__save-button_disabled");
  buttonElement.disabled = true;
};
