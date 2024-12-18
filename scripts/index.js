import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupCloseButtons,
  gridContainer,
  initialCards,
  closePopup,
  validationConfig,
  formList,
} from "./utils.js";

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#grid__card");
  const cardElement = card.generateCard();
  gridContainer.appendChild(cardElement);
});

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});
