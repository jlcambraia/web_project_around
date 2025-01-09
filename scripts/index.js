import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  initialCards,
  editButton,
  addButton,
  editSaveButton,
  addSaveButton,
  editInputName,
  editInputAbout,
  // saveProfileInfo,
  addNewCard,
  gridContainerSelector,
  gridContainer,
  openPopupWithNameAndAbout,
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

// Instância para card UserInfo

export const userInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
});

// Fim da Instância para card UserInfo

export const editPopupInstance = new PopupWithForm(
  ".popup_type_edit",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      about: formData.about,
    });
  }
);
export const addPopupInstance = new PopupWithForm(
  ".popup_type_add",
  addNewCard
);

editButton.addEventListener("click", () => {
  editPopupInstance.open();
  openPopupWithNameAndAbout();
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
