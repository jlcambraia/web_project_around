import { noCardsMessage } from "./utils.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._setEventListeners();

    this._element.querySelector(".grid__card-title").textContent = this._name;
    this._element.querySelector(".grid__img").src = this._link;
    this._element.querySelector(".grid__img").alt = this._alt;

    return this._element;
  }

  _handleLikeClick() {
    const likeIcon = this._element.querySelector(".grid__like-icon");
    likeIcon.classList.toggle("grid__like-icon_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    noCardsMessage();
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__like-icon")
      .addEventListener("click", () => this._handleLikeClick());
    this._element
      .querySelector(".grid__delete-icon")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element.querySelector(".grid__img").addEventListener("click", () => {
      this._handleCardClick({
        image: this._link,
        alt: this._alt,
        caption: this._name,
      });
    });
  }
}
