import Card from "./Card.js";
import Popup from "./Popup.js";
import Section from "./Section.js";
import {
  initialCards,
  editButton,
  addButton,
  editSaveButton,
  addSaveButton,
  saveProfileInfo,
  addNewCard,
  gridContainerSelector,
} from "./utils.js";

// Instância para cartões dinamicamente para página
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

// Instância para abrir edit e add popup
const editPopupInstance = new Popup(".popup_type_edit");
editPopupInstance.setEventListeners();

const addPopupInstance = new Popup(".popup_type_add");
addPopupInstance.setEventListeners();

editButton.addEventListener("click", () => {
  editPopupInstance.open();
});

addButton.addEventListener("click", () => {
  addPopupInstance.open();
});

// Fim da instância para abrir edit e add popup

editSaveButton.addEventListener("click", saveProfileInfo);

addSaveButton.addEventListener("click", addNewCard);
