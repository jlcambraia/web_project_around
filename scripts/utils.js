import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Cards iniciais
export const initialCards = [
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

// Variáveis
export const gridContainer = document.querySelector(".grid__card-container");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup_type_image");
const editProfileName = document.querySelector(".profile__user-name");
const editProfileAbout = document.querySelector(".profile__user-about");
const editInputName = document.querySelector("#popup__input-name");
const editInputAbout = document.querySelector("#popup__input-about");
const addInputLink = document.querySelector("#popup__input-link");
const addInputTitle = document.querySelector("#popup__input-title");
export const editSaveButton = document.querySelector(
  "#popup__save-edit-button"
);
export const addSaveButton = document.querySelector("#popup__save-add-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const gridMessage = document.querySelector(".grid__without-cards-text");
export const popups = document.querySelector(".popups");

export const gridContainerSelector = ".grid__card-container";

// Função para abrir popups
export function openPopup(popup) {
  popup.classList.remove("popup_hidden");
}

// Função para fechar popups
function closePopup(popup) {
  popup.classList.add("popup_hidden");
  resetPopup();
}

// Função para abrir edit popup já com o name e about preenchidos
export function openPopupWithNameAndAbout() {
  editInputName.value = editProfileName.textContent;
  editInputAbout.value = editProfileAbout.textContent;
}

// Função que seleciona todos os botões de fechar popup e fazem eles funcionar
export function handleCloseButtons(evt) {
  const closeButton = evt.target;
  if (closeButton.classList.contains("popup__close-button-icon")) {
    const targetPopup = closeButton.closest(".popup");
    closePopup(targetPopup);
  }
}

// Salvar edição de name e about
export function saveProfileInfo(evt) {
  evt.preventDefault();
  editProfileName.textContent = editInputName.value;
  editProfileAbout.textContent = editInputAbout.value;
  closePopup(editPopup);
}

// Função para abrir popup de imagens
export function openImagePopup(evt) {
  const targetButton = evt.target;

  if (targetButton.classList.contains("grid__img")) {
    openPopup(imagePopup);
    popupImage.src = targetButton.src;

    const card = targetButton.closest(".grid__card");
    const cardTitle = card.querySelector(".grid__card-title");

    popupCaption.textContent = cardTitle.textContent;
  }
}

// Função para fechar popup clicando fora do card
export function closePopupOnOverlay(evt) {
  const popup = evt.target.closest(".popup");
  if (evt.target.classList.contains("popup")) {
    closePopup(popup);
  }
}

// Função para fechar popup pressionando tecla esc
export function closePopupOnEscKey(evt) {
  if (evt.key === "Escape") {
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }

    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      if (!popup.classList.contains("popup_hidden")) {
        closePopup(popup);
      }
    });
  }
}

// Função para verificar se há cards no grid
export function noCardsMessage() {
  if (gridContainer.children.length !== 0) {
    gridMessage.classList.add("grid__without-cards-text_hidden");
  } else {
    gridMessage.classList.remove("grid__without-cards-text_hidden");
  }
}

// Função para resetar formulários
function resetPopup() {
  const inputList = Array.from(document.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.value = "";
    inputElement.classList.remove("popup__input_type_error");
  });

  const errorList = Array.from(
    document.querySelectorAll(".popup__input-error")
  );
  errorList.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.add("popup__input-error_hidden");
  });

  const buttonList = Array.from(
    document.querySelectorAll(".popup__save-button")
  );
  buttonList.forEach((buttonElement) => {
    buttonElement.classList.add("popup__save-button");
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.setAttribute("disabled", true);
  });
}

// Função para adicionar novas imagens ao grid
export function addNewCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: addInputTitle.value,
    link: addInputLink.value,
    alt: `Imagem de ${addInputTitle.value}`,
  };

  const newCard = new Card(newCardData, "#grid__card");
  gridContainer.prepend(newCard.generateCard());

  addInputLink.value = "";
  addInputTitle.value = "";

  closePopup(addPopup);
  noCardsMessage();
}

// Configuração para validação
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClassHidden: "popup__input-error_hidden",
};

const formValidator = new FormValidator(configValidation);
formValidator.enableValidation();
