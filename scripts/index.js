import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import {
  configValidation,
  editButton,
  addButton,
  addNewCard,
  gridContainerSelector,
  openPopupWithNameAndAbout,
  apiConfig,
} from "./utils.js";

// Instância para validação de formulários
const formValidator = new FormValidator(configValidation);
formValidator.enableValidation();

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

// Instância para classe Api
const api = new Api(apiConfig);

// Constantes que pegam Nome e About via API
const userImportedInfo = await api
  .getUserInfo()
  .then((result) => result)
  .catch((err) => {
    console.error(
      `Desculpe o incoveniente, estamos enfrentando este erro: ${err}`
    );
  });

// Instância para coletar informações de nome do usuário e about
export const userInfo = new UserInfo(userImportedInfo);

// Renderizar Nome e About do usuário que pegou do API
userInfo.renderUserInfo(".profile__user-name", ".profile__user-about");

// Constantes que pegam cards salvos via API
const initialCards = await api
  .getInitialCards()
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(
      `Desculpe o incoveniente, estamos enfrentando este erro: ${err}`
    );
  });

console.log(initialCards);

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

// API

api
  .getUserInfo()
  .then((result) => {
    console.log(result.name);
  })
  .catch((err) => {
    console.error(
      `Desculpe o incoveniente, estamos enfrentando este erro: ${err}`
    );
  });

api
  .getInitialCards()
  .then((result) => {
    result.forEach((info) => {
      console.log(info);
    });
  })
  .catch((err) => {
    console.log(
      `Desculpe o incoveniente, estamos enfrentando este erro: ${err}`
    );
  });
