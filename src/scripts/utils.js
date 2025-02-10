// Variáveis
export const popupEditButton = document.querySelector(".profile__edit-button");
export const popupAddButton = document.querySelector(".profile__add-button");
export const popupEditSubmitButton = document.querySelector(
  "#popup__save-edit-button"
);
export const popupAddSubmitButton = document.querySelector(
  "#popup__save-add-button"
);
export const popupChangeProfileSubmitButton = document.querySelector(
  "#popup__change-profile-picture-button"
);
export const popupChangeProfileButton = document.querySelector(
  ".profile__picture-container"
);
export const popupDeleteConfirmationButton = document.querySelector(
  "#popup__delete-confirmation-button"
);
export const popupChangeProfileInput = document.querySelector(
  "#popup__input-change-profile-link"
);
export const profilePicture = document.querySelector(".profile__picture");
export const popupInputName = document.querySelector("#popup__input-name");
export const popupInputAbout = document.querySelector("#popup__input-about");
const gridContainer = document.querySelector(".grid__card-container");
const noCardsMessage = document.querySelector(".grid__without-cards-text");
export const forms = document.querySelectorAll("form");

// Base para validação dos códigos
export const configValidate = {
  disabledButtonClass: "popup__save-button_disabled",
  hiddenInputClass: "popup__input-error_hidden",
  redBorderInputClass: "popup__input_type_error",
  inputErrorMessageClass: "popup__input-error",
};

// Configuração para API
export const apiConfig = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  token: "a97c4c63-ce40-4267-993b-56ebee3b0bfe",
};

// Esconder mensagem de que não há cartões
export function toggleNoCardsMessage() {
  if (gridContainer.children.length === 0) {
    noCardsMessage.classList.remove("grid__without-cards-text_hidden");
  } else {
    noCardsMessage.classList.add("grid__without-cards-text_hidden");
  }
}

export function checkCardOwner({ cardsInfoFromApi }) {
  const allCards = document.querySelectorAll(".grid__card");

  allCards.forEach((card) => {
    const deleteIcon = card.querySelector(".grid__delete-icon");
    console.log(deleteIcon);

    if (!cardsInfoFromApi.owner === "0afe04124b56e106a47e1aa1") {
      deleteIcon.remove();
    }
  });
}
