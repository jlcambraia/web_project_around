import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
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
  gridContainer,
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
const addPopupInstance = new Popup(".popup_type_add");

editButton.addEventListener("click", () => {
  editPopupInstance.open();
});

addButton.addEventListener("click", () => {
  addPopupInstance.open();
});

// Fim da instância para abrir edit e add popup

// Instância para abrir image popup

const imagePopupInstance = new PopupWithImage(".popup_type_image");

gridContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("grid__img")) {
    const image = evt.target.src;
    const alt = evt.target.alt;
    const caption = evt.target
      .closest(".grid__card")
      .querySelector(".grid__card-title").textContent;

    imagePopupInstance.open({ image, alt, caption });
  }
});

// Fim da instância para abrir image popup

editSaveButton.addEventListener("click", saveProfileInfo);

addSaveButton.addEventListener("click", addNewCard);
