import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  initialCards,
  configValidation,
  editButton,
  addButton,
  addNewCard,
  gridContainerSelector,
  openPopupWithNameAndAbout,
} from "./utils.js";

// Instância para renderizar cards iniciais
const cardList = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = new Card(card, "#grid__card", (popupData) =>
        imagePopupInstance.open(popupData)
      );
      const cardElement = newCard.generateCard();

      cardList.addItem(cardElement);
    },
  },
  gridContainerSelector
);

cardList.renderer();

// Instância para validação de formulários
const formValidator = new FormValidator(configValidation);
formValidator.enableValidation();

// Instância para coletar informações de nome do usuário e about
export const userInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
});

// Instância referente ao Edit Popup
export const editPopupInstance = new PopupWithForm(
  ".popup_type_edit",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      about: formData.about,
    });
  }
);

// Instância referente ao Add Popup
export const addPopupInstance = new PopupWithForm(
  ".popup_type_add",
  addNewCard
);

// Instância referente ao Image Popup
export const imagePopupInstance = new PopupWithImage(".popup_type_image");

// Ouvintes de evento
editButton.addEventListener("click", () => {
  editPopupInstance.open();
  openPopupWithNameAndAbout();
});

addButton.addEventListener("click", () => {
  addPopupInstance.open();
});
