import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import Card from "../scripts/Card.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation.js";
import PopupWithError from "../scripts/PopupWithError.js";
import UserInfo from "../scripts/UserInfo.js";
import Api from "../scripts/Api.js";

import {
  popupEditButton,
  popupAddButton,
  popupEditSubmitButton,
  popupAddSubmitButton,
  popupChangeProfileSubmitButton,
  popupChangeProfileButton,
  popupDeleteConfirmationButton,
  popupChangeProfileInput,
  profilePicture,
  popupInputName,
  popupInputAbout,
  forms,
  configValidate,
  apiConfig,
  toggleNoCardsMessage,
} from "../scripts/utils.js";

// Instância para o Api
const api = new Api(apiConfig);

// Instância para UserInfo
const userInfo = new UserInfo(
  ".profile__user-name",
  ".profile__user-about",
  ".profile__picture"
);

// Instância para Form Validate
forms.forEach((form) => {
  const formValidator = new FormValidator(configValidate, form);
  formValidator.enableValidation();
});

// Instância para Popup com imagens
const imagePopup = new PopupWithImage(".popup_type_image");

// Instância para Edit em PopupWithForm
const editPopup = new PopupWithForm(".popup_type_edit", saveNewInfo);

// Instância dos Add em PopupWithForm
const addPopup = new PopupWithForm(".popup_type_add", addCards);

// Instância para o PopupWithConfirmation
const deleteConfirmationPopup = new PopupWithConfirmation(
  ".popup_type_delete",
  popupDeleteConfirmationButton
);

// Instância para o PopupWithError
const errorPopup = new PopupWithError(
  ".popup_type_error_message",
  ".popup__message"
);

// Instância para Popup para alterar Avatar
const changeAvatar = new PopupWithForm(
  ".popup_type_change-profile-picture",
  handleChangeAvatar
);

// Chamar getUserInfoAndCards para carregar as informações do User e dos Cards
const { userInfo: userInfoFromApi, cards: cardsInfoFromApi } = await api
  .getUserInfoAndCards()
  .then((result) => result)
  .catch((err) => {
    errorPopup.showError(`Erro ao obter informações: ${err}`);
  });

// Renderizar cards com Section, com dados coletados no servidor
const renderCards = new Section(
  {
    data: cardsInfoFromApi.reverse(),
    renderer: (item) => {
      const card = new Card(
        item,
        "#grid__card",
        ".grid__card",
        handleCardClick,
        handleOpenDeleteConfirmationPopup,
        handleRemoveCardFromApi,
        changeLikeCardStateAtApi
      );
      const cardElement = card.generateCard();
      renderCards.setItem(cardElement);
    },
  },
  ".grid__card-container"
);

renderCards.renderItems();

// Adicionar novos cards, funcionando com Api e PopupWithForm
async function addCards(inputData) {
  try {
    popupAddSubmitButton.textContent = "Salvando...";
    popupAddSubmitButton.setAttribute("disabled", true);
    popupAddSubmitButton.classList.add("popup__save-button_disabled");

    const newCardData = await api.addNewCard(inputData.name, inputData.link);

    const newCard = new Card(
      newCardData,
      "#grid__card",
      ".grid__card",
      handleCardClick,
      handleOpenDeleteConfirmationPopup,
      handleRemoveCardFromApi,
      changeLikeCardStateAtApi
    );

    const newCardElement = newCard.generateCard();
    renderCards.setItem(newCardElement);

    toggleNoCardsMessage();
    addPopup.close();
  } catch (err) {
    errorPopup.showError(`Erro ao obter informações: ${err}`);
  } finally {
    popupAddSubmitButton.textContent = "Criar";
  }
}

// Renderizar nome e about com dados coletados no servidor
function renderInitialNameAndAbout() {
  userInfo.setUserInfo(
    userInfoFromApi.name,
    userInfoFromApi.about,
    userInfoFromApi.avatar
  );
}
renderInitialNameAndAbout();

// Salvar novos dados de nome e sobre
function saveNewInfo() {
  popupEditSubmitButton.textContent = "Salvando...";
  popupEditSubmitButton.setAttribute("disabled", true);
  popupEditSubmitButton.classList.add("popup__save-button_disabled");
  api
    .setUserInfo(popupInputName.value, popupInputAbout.value)
    .then(() => {
      userInfo.setUserInfo(popupInputName.value, popupInputAbout.value);
      editPopup.close();
    })
    .catch((err) => {
      errorPopup.showError(`Erro ao obter informações: ${err}`);
    })
    .finally(() => {
      popupEditSubmitButton.textContent = "Salvar";
    });
}

// Abrir o popup de imagem
// Esta função está sendo passada como callback nas instâncias de criação de Card
function handleCardClick(name, link, alt) {
  imagePopup.open(name, link, alt);
}

// Alterar curtir e descurtir do card do servidor
// Está sendo passado como callback para a classe Card
function changeLikeCardStateAtApi(cardId, isLiked) {
  api.updateLikeState(cardId, isLiked).catch((err) => {
    errorPopup.showError(`Erro ao obter informações: ${err}`);
  });
}

// Remover o card após a confirmação
// Esta função está sendo passada como callback na instância do Card
function handleRemoveCardFromApi(cardId, removeCard) {
  api
    .deleteCard(cardId)
    .then(() => {
      removeCard();
      toggleNoCardsMessage();
    })
    .catch((err) => {
      errorPopup.showError(`Erro ao obter informações: ${err}`);
    });
}

// Abrir o popup de confirmação de exclusão de card
// Esta função está sendo passada como callback nas instâncias de criação de Card
function handleOpenDeleteConfirmationPopup(cardId, removeCard) {
  // Define a ação de confirmação
  deleteConfirmationPopup.submitConfirm(() => {
    handleRemoveCardFromApi(cardId, removeCard);
  });
  deleteConfirmationPopup.open();
}

// Alterar o avatar
function handleChangeAvatar() {
  popupChangeProfileSubmitButton.textContent = "Salvando...";
  popupChangeProfileSubmitButton.setAttribute("disabled", true);
  popupChangeProfileSubmitButton.classList.add("popup__save-button_disabled");

  api
    .changeProfileImage(popupChangeProfileInput.value)
    .then(() => {
      profilePicture.setAttribute("src", popupChangeProfileInput.value);
    })
    .then(() => {
      changeAvatar.close();
    })
    .catch((err) => {
      errorPopup.showError(`Erro ao obter informações: ${err}`);
    })
    .finally(() => {
      popupChangeProfileSubmitButton.textContent = "Salvar";
    });
}

// Ouvinte para abrir Edit Popup com informações do usuário nos inputs
popupEditButton.addEventListener("click", () => {
  const openPopupInfo = userInfo.getUserInfo();
  popupInputName.value = openPopupInfo.name;
  popupInputAbout.value = openPopupInfo.about;
  editPopup.open();
});

// Ouvinte para abrir Add Popup
popupAddButton.addEventListener("click", () => {
  addPopup.open();
});

// Ouvinte para abrir Popup que altera Avatar
popupChangeProfileButton.addEventListener("click", () => {
  changeAvatar.open();
});

// Chamando a verificação de cards no grid
toggleNoCardsMessage();
