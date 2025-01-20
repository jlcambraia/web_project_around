import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import PopupWithError from "./PopupWithError.js";
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

// Instância para mostrar mensagem de erro
const errorPopupInstance = new PopupWithError(
  ".popup_type_error_message",
  ".popup__message"
);

// Instância referente ao Edit Popup
export const editPopupInstance = new PopupWithForm(
  ".popup_type_edit",
  (formData, saveButton) => {
    if (!formData.name || !formData.about) {
      return;
    }

    saveButton.textContent = "Salvando...";

    userInfo.setUserInfo(
      { name: formData.name, about: formData.about },
      ".profile__user-name",
      ".profile__user-about"
    );

    api
      .updateUserInfo(formData.name, formData.about)
      .then(() => {
        saveButton.textContent = "Salvar";
        editPopupInstance.close();
      })
      .catch((err) => {
        saveButton.textContent = "Salvar";
        errorPopupInstance.showError(
          `Erro ao obter informações do usuário: ${err}`
        );
      });
  }
);

// Instância referente ao Add Popup
let isRequestInProgress = false;

export const addPopupInstance = new PopupWithForm(
  ".popup_type_add",
  (input, saveButton) => {
    if (isRequestInProgress) return;
    isRequestInProgress = true;
    saveButton.textContent = "Salvando...";

    api
      .saveNewCards(input.title, input.link)
      .then((newCardInfo) => {
        const newCardData = {
          name: newCardInfo.name,
          link: newCardInfo.link,
          alt: `Imagem de ${newCardInfo.name}`,
          _id: newCardInfo._id,
          owner: newCardInfo.owner,
        };

        const newCard = new Card(newCardData, "#grid__card", (inputInfo) =>
          imagePopupInstance.open(inputInfo)
        );

        if (newCardData.owner !== userInfo._idElement) {
          const deleteIcon =
            newCard._element.querySelector(".grid__delete-icon");
          if (deleteIcon) {
            deleteIcon.remove();
          }
        }

        gridContainer.prepend(newCard.generateCard());
        addPopupInstance.close();
        noCardsMessage();
      })
      .catch((err) => {
        errorPopupInstance.showError(
          `Erro ao obter informações do usuário: ${err}`
        );
      })
      .finally(() => {
        saveButton.textContent = "Salvar";
        isRequestInProgress = false;
      });
  }
);

// Instância referente ao Image Popup
export const imagePopupInstance = new PopupWithImage(
  ".popup_type_image",
  ".popup__image",
  ".popup__caption"
);

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

// Chamar getUserInfoAndCards para carregar as informações
const { userInfo: userInfoFromApi, cards: initialCards } = await api
  .getUserInfoAndCards()
  .then((result) => result)
  .catch((err) => {
    errorPopupInstance.showError(
      `Erro ao obter informações do usuário ou dos cartões: ${err}`
    );
  });

// Instância para coletar informações de nome do usuário e about
export const userInfo = new UserInfo(userInfoFromApi);

// Renderizar Nome e About do usuário que pegou do API
userInfo.setUserInfo(
  {
    name: userInfoFromApi.name,
    about: userInfoFromApi.about,
    avatar: userInfoFromApi.avatar,
  },
  ".profile__user-name",
  ".profile__user-about",
  ".profile__picture"
);

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
    errorPopupInstance.showError(
      `Erro ao obter informações do usuário: ${err}`
    );
  });
});

// Instância para o Popup de Confirmação de exclusão de Card

export const popupWithConfirmationInstance = new PopupWithConfirmation(
  ".popup_type_delete",
  ".popup__delete-confirmation-button"
);

// Instância para lidar com Popup que altera imagem do Perfil
const changeProfilePicturePopup = new PopupWithForm(
  ".popup_type_change-profile-picture",
  (input, saveButton) => {
    saveButton.textContent = "Salvando...";

    api
      .updateProfilePicture(input.link)
      .then(() => {
        document.querySelector(".profile__picture").src = input.link;
        changeProfilePicturePopup.close();
      })
      .catch((err) => {
        errorPopupInstance.showError(
          `Erro ao obter informações do usuário: ${err}`
        );
      })
      .finally(() => {
        saveButton.textContent = "Salvar";
      });
  }
);

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("profile__icon") ||
    evt.target.classList.contains("profile__picture")
  ) {
    changeProfilePicturePopup.open();
  }
});
