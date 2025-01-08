import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
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

// Início da instância para o PopupWithForm

export const editPopupInstance = new PopupWithForm(
  ".popup_type_edit",
  saveProfileInfo
);
export const addPopupInstance = new PopupWithForm(
  ".popup_type_add",
  addNewCard
);

editButton.addEventListener("click", () => {
  editPopupInstance.open();
});

addButton.addEventListener("click", () => {
  addPopupInstance.open();
});

// Fim da instância para o PopupWithForm

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

// editSaveButton.addEventListener("click", saveProfileInfo);

// addSaveButton.addEventListener("click", addNewCard);
