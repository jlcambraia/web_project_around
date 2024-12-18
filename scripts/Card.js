import { toggleNoCardsMessage } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
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

    this._element.querySelector(".grid__img").src = this._link;
    this._element.querySelector(".grid__img").alt = this._alt;
    this._element.querySelector(".grid__card-title").textContent = this._name;

    toggleNoCardsMessage();

    return this._element;
  }

  addToContainer(container) {
    const card = this.generateCard();
    container.prepend(card);
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__like-icon")
      .addEventListener("click", () => this._handleLikeClick());
    this._element
      .querySelector(".grid__delete-icon")
      .addEventListener("click", () => this._handleDeleteCard());
  }

  _handleLikeClick() {
    const likeIcon = this._element.querySelector(".grid__like-icon");
    likeIcon.classList.toggle("grid__like-icon_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    toggleNoCardsMessage();
  }
}
