import Card from "./Card.js";
import {
  initialCards,
  gridContainer,
  editButton,
  addButton,
  editPopup,
  addPopup,
  editSaveButton,
  addSaveButton,
  popups,
  openPopup,
  saveProfileInfo,
  addNewCard,
  openPopupWithNameAndAbout,
  handleCloseButtons,
  openImagePopup,
  closePopupOnOverlay,
  closePopupOnEscKey,
} from "./utils.js";

// Subir cartões dinamicamente para página
initialCards.forEach((card) => {
  const newCard = new Card(card, "#grid__card");
  gridContainer.append(newCard.generateCard());
});

// Ouvintes de evento
editButton.addEventListener("click", () => {
  openPopupWithNameAndAbout();
  openPopup(editPopup);
});

editSaveButton.addEventListener("click", saveProfileInfo);

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

addSaveButton.addEventListener("click", addNewCard);

popups.addEventListener("click", handleCloseButtons);

gridContainer.addEventListener("click", openImagePopup);

document.addEventListener("click", closePopupOnOverlay);

document.addEventListener("keydown", closePopupOnEscKey);
