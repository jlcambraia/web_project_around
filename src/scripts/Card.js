import { noCardsMessage } from "./utils.js";
import { api } from "../pages/index.js";
import { popupWithConfirmationInstance } from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = `Imagem de ${data.name}`;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._isLiked = data.isLiked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".grid__card-title").textContent = this._name;
    this._element.querySelector(".grid__img").src = this._link;
    this._element.querySelector(".grid__img").alt = this._alt;

    const likeIcon = this._element.querySelector(".grid__like-icon");
    if (this._isLiked) {
      likeIcon.classList.add("grid__like-icon_active");
    }

    this._setEventListeners();

    return this._element;
  }

  _handleLikeClick() {
    const likeIcon = this._element.querySelector(".grid__like-icon");
    const isLiked = likeIcon.classList.contains("grid__like-icon_active");

    api
      .changeIsLiked(!isLiked, this._id)
      .then((result) => {
        likeIcon.classList.toggle("grid__like-icon_active", result.isLiked);
      })
      .catch((err) => {
        console.error(
          `Desculpe o inconveniente, estamos enfrentando este erro: ${err}`
        );
      });
  }

  _handleDeleteClick() {
    popupWithConfirmationInstance.setHandleConfirm(() => {
      api
        .deleteCard(this._id)
        .then(() => {
          this._element.remove();
          popupWithConfirmationInstance.close();
          noCardsMessage();
        })
        .catch((err) => {
          console.error(
            `Desculpe o inconveniente, estamos enfrentando este erro: ${err}`
          );
        });
    });

    popupWithConfirmationInstance.open();
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__like-icon")
      .addEventListener("click", () => this._handleLikeClick());
    this._element
      .querySelector(".grid__delete-icon")
      .addEventListener("click", () => this._handleDeleteClick());

    this._element.querySelector(".grid__img").addEventListener("click", () => {
      this._handleCardClick({
        image: this._link,
        alt: this._alt,
        caption: this._name,
      });
    });
  }
}
