import Card from "./Card.js";
import Section from "./Section.js";
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
  gridContainerSelector,
} from "./utils.js";

// Subir cartões dinamicamente para página
const cardList = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = new Card(card, "#grid__card");
      const cardElement = newCard.generateCard();

      cardList.addItem(cardElement);
    },
  },
  gridContainerSelector
);

cardList.renderer();

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
