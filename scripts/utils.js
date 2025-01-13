import Card from "./Card.js";
import { addPopupInstance, userInfo, imagePopupInstance } from "./index.js";

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

// Constantes
export const gridContainer = document.querySelector(".grid__card-container");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_add");
export const editInputName = document.querySelector("#popup__input-name");
export const editInputAbout = document.querySelector("#popup__input-about");
export const editSaveButton = document.querySelector(
  "#popup__save-edit-button"
);
export const addSaveButton = document.querySelector("#popup__save-add-button");
const gridMessage = document.querySelector(".grid__without-cards-text");
export const popups = document.querySelectorAll(".popups");

export const gridContainerSelector = ".grid__card-container";

// Função para abrir edit popup já com o name e about preenchidos
export function openPopupWithNameAndAbout() {
  const currentUserInfo = userInfo.getUserInfo();
  editInputName.value = currentUserInfo.name;
  editInputAbout.value = currentUserInfo.about;
}

// Função para adicionar novas imagens ao grid
export function addNewCard(inputValue) {
  if (!inputValue.title || !inputValue.link) {
    return;
  }

  const newCardData = {
    name: inputValue.title,
    link: inputValue.link,
    alt: `Imagem de ${inputValue.title}`,
  };

  const newCard = new Card(newCardData, "#grid__card", (popupData) =>
    imagePopupInstance.open(popupData)
  );
  gridContainer.prepend(newCard.generateCard());
  addPopupInstance.close();

  noCardsMessage();
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
export function resetPopup() {
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

// Configuração para validação
export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClassHidden: "popup__input-error_hidden",
};
