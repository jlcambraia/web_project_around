import { Card } from "./Card.js";

// Variáveis
const popupEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupInputName = document.querySelector("#popup__input-name");
const popupInputAbout = document.querySelector("#popup__input-about");
const popupInputTitle = document.querySelector("#popup__input-title");
const popupInputLink = document.querySelector("#popup__input-link");
const userName = document.querySelector(".profile__user-name");
const userAbout = document.querySelector(".profile__user-about");
const popupSaveEditButton = document.querySelector("#popup__save-edit-button");
const popupSaveAddButton = document.querySelector("#popup__save-add-button");
const gridContainer = document.querySelector(".grid__card-container");
const popupImageImg = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const noCardsMessage = document.querySelector(".grid__without-cards-text");

// Configuração para a validação
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_hidden",
};

export const formList = document.querySelectorAll(
  validationConfig.formSelector
);

// Array dos cards iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    alt: "Imagem do Parque Nacional de Yosemite, Califórnia, com suas majestosas montanhas e paisagens naturais deslumbrantes.",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    alt: "Imagem do Lago sereno com montanhas majestosas ao fundo, refletindo a beleza natural da paisagem.",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    alt: "Imagem de um pôr do sol sobre montanhas.",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    alt: "Imagem de uma cadeia de montanhas sob um céu estrelado, destacando a beleza da natureza à noite.",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    alt: "Imagem de um lago de montanha refletindo as montanhas ao fundo, criando uma cena serena e natural.",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    alt: "Imagem de barcos atracados em um cais, com montanhas majestosas ao fundo, criando uma paisagem serena e natural.",
  },
];

// Função para alternar a mensagem de 'sem cards'

export function toggleNoCardsMessage() {
  if (gridContainer.children.length === 0) {
    noCardsMessage.classList.remove("grid__without-cards-text_hidden");
  } else {
    noCardsMessage.classList.add("grid__without-cards-text_hidden");
  }
}

// Função para resetar formulários
export function resetForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll("input"));
  inputList.forEach((inputElement) => {
    inputElement.value = "";
    inputElement.classList.remove("popup__input_type_error");
  });

  const errorList = Array.from(
    formElement.querySelectorAll(".popup__input-error")
  );
  errorList.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.add("popup__input-error_hidden");
  });

  const buttonElement = formElement.querySelector(".popup__save-button");
  buttonElement.classList.add("popup__save-button_disabled");
  buttonElement.disabled = true;
}

// Funções para abrir e fechar popups
export function openPopup(
  popup,
  popupInputName,
  popupInputAbout,
  userName,
  userAbout,
  popupSaveEditButton
) {
  const form = popup.querySelector(".popup__form");

  resetForm(form);

  if (popup.classList.contains("popup_type_edit")) {
    popupInputName.value = userName.textContent;
    popupInputAbout.value = userAbout.textContent;

    if (popupInputName.value && popupInputAbout.value) {
      popupSaveEditButton.classList.remove("popup__save-button_disabled");
      popupSaveEditButton.disabled = false;
    }
  }

  popup.classList.remove("popup_hidden");
}

export function closePopup(popup) {
  if (popup) {
    popup.classList.add("popup_hidden");
  }
}

//Abrir e fechar popup da imagem

export function setupGridClickListener(
  gridContainer,
  popupImage,
  popupImageImg,
  popupImageCaption
) {
  gridContainer.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("grid__img")) {
      const cardImage = evt.target;
      const cardTitle = evt.target
        .closest(".grid__card")
        .querySelector(".grid__card-title");

      popupImage.classList.remove("popup_hidden");
      popupImageImg.src = cardImage.src;
      popupImageCaption.textContent = cardTitle.textContent;
    }
  });
}

// Função para fechar popups com o botão ESC
export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopups = document.querySelectorAll(".popup:not(.popup_hidden)");
    openedPopups.forEach((popup) => closePopup(popup));
    document.activeElement.blur();
  }
}

// Função para fechar popups ao clicar fora do card
export function handlePopupOverlay(evt) {
  const popup = evt.target.closest(".popup");
  if (
    !evt.target.closest(".popup__card") &&
    !evt.target.closest(".popup__content")
  ) {
    closePopup(popup);
  }
}

// Adicionar novos cards
function addCards(evt) {
  evt.preventDefault();

  const newCardData = {
    name: popupInputTitle.value,
    link: popupInputLink.value,
    alt: `Imagem de ${popupInputTitle.value}`,
  };

  const card = new Card(newCardData, "#grid__card");
  card.addToContainer(gridContainer);

  popupInputLink.value = "";
  popupInputTitle.value = "";

  toggleNoCardsMessage();
  closePopup(popupAdd);
}

// Função para salvar novos dados de nome e sobre
function saveNewInfo(evt) {
  evt.preventDefault();
  userName.textContent = popupInputName.value;
  userAbout.textContent = popupInputAbout.value;
  closePopup(popupEdit);
}

// Ouvintes de Eventos
popupEditButton.addEventListener("click", () =>
  openPopup(
    popupEdit,
    popupInputName,
    popupInputAbout,
    userName,
    userAbout,
    popupSaveEditButton
  )
);
popupAddButton.addEventListener("click", () => openPopup(popupAdd));
document.addEventListener("keydown", (evt) => handleEscapeKey(evt));
document.addEventListener("click", (evt) => handlePopupOverlay(evt));
setupGridClickListener(
  gridContainer,
  popupImage,
  popupImageImg,
  popupImageCaption
);
popupSaveAddButton.addEventListener("click", addCards);
popupSaveEditButton.addEventListener("click", saveNewInfo);

// Exportação de variáveis
export {
  popupEditButton,
  popupAddButton,
  popupCloseButtons,
  popupSaveEditButton,
  popupSaveAddButton,
  popupEdit,
  popupAdd,
  gridContainer,
  popupImage,
  popupImageImg,
  popupImageCaption,
  popupInputName,
  popupInputAbout,
  popupInputLink,
  popupInputTitle,
  userName,
  userAbout,
  initialCards,
};
