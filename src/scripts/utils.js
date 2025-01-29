import { userInfo } from "../pages/index.js";

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
const gridMessage = document.querySelector(".grid__without-cards-text");
export const popups = document.querySelectorAll(".popups");
export const gridContainerSelector = ".grid__card-container";
export const forms = document.querySelectorAll("form");

// Função para abrir edit popup já com o name e about preenchidos
export function openPopupWithNameAndAbout() {
  const currentUserInfo = userInfo.getUserInfo();
  editInputName.value = currentUserInfo.name;
  editInputAbout.value = currentUserInfo.about;
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
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.setAttribute("disabled", true);
  });
}

// Configuração para validação
export const configValidation = {
  inactiveButtonClass: "popup__save-button_disabled",
  errorClassHidden: "popup__input-error_hidden",
  inputErrorClass: "popup__input_type_error",
  inputErrorMessageClass: "popup__input-error",
};

// Configuração para API
export const apiConfig = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  token: "a97c4c63-ce40-4267-993b-56ebee3b0bfe",
};
