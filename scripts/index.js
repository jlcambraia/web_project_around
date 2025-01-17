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
  gridContainerSelector,
  openPopupWithNameAndAbout,
  apiConfig,
  editSaveButton,
  editInputName,
  editInputAbout,
  gridContainer,
  noCardsMessage,
} from "./utils.js";

// Instância para validação de formulários
const formValidator = new FormValidator(configValidation);
formValidator.enableValidation();

// Instância referente ao Edit Popup
export const editPopupInstance = new PopupWithForm(
  ".popup_type_edit",
  (formData) => {
    userInfo.setUserInfo(
      { name: formData.name, about: formData.about },
      ".profile__user-name",
      ".profile__user-about"
    );
  }
);

// Instância referente ao Add Popup
export const addPopupInstance = new PopupWithForm(
  ".popup_type_add",
  (input) => {
    api
      .saveNewCards(input.title, input.link)
      .then((newCardInfo) => {
        const newCardData = {
          name: newCardInfo.name,
          link: newCardInfo.link,
          alt: `Imagem de ${newCardInfo.name}`,
          _id: newCardInfo._id,
        };

        const newCard = new Card(newCardData, "#grid__card", (inputInfo) =>
          imagePopupInstance.open(inputInfo)
        );

        gridContainer.prepend(newCard.generateCard());

        addPopupInstance.close();
        noCardsMessage();
      })
      .catch((err) => {
        console.error(`Erro ao salvar o novo card: ${err}`);
      });
  }
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
export const api = new Api(apiConfig);

// Constantes que pegam Nome e About via API
const userInfoFromApi = await api
  .getUserInfo()
  .then((result) => result)
  .catch((err) => {
    console.error(
      `Desculpe o incoveniente, estamos enfrentando este erro: ${err}`
    );
  });

// Instância para coletar informações de nome do usuário e about
export const userInfo = new UserInfo(userInfoFromApi);

// Renderizar Nome e About do usuário que pegou do API
userInfo.setUserInfo(
  { name: userInfoFromApi.name, about: userInfoFromApi.about },
  ".profile__user-name",
  ".profile__user-about"
);

// Constantes que pegam cards salvos via API
const initialCards = await api
  .getInitialCards()
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.error(
      `Desculpe o incoveniente, estamos enfrentando este erro: ${err}`
    );
  });

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

// Ouvinte que salva dados alterados pelo usuário no servidor
editSaveButton.addEventListener("click", () => {
  api.updateUserInfo(editInputName.value, editInputAbout.value).catch((err) => {
    console.error(`Erro ao atualizar informações do usuário: ${err}`);
  });
});

console.log(await api.getInitialCards());
console.log(await api.getUserInfo());
console.log(userInfo);
