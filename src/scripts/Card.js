export default class Card {
  constructor(
    cardData,
    cardTemplate,
    cardSelector,
    handleCardClick,
    handleOpenDeleteConfirmationPopup,
    handleRemoveCardFromApi,
    changeLikeCardStateAtApi
  ) {
    this._cardTemplate = cardTemplate;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleOpenDeleteConfirmationPopup = handleOpenDeleteConfirmationPopup;
    this._handleRemoveCardFromApi = handleRemoveCardFromApi;
    this._changeLikeCardStateAtApi = changeLikeCardStateAtApi;
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.alt;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
  }

  _setTemplate() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".grid__img").setAttribute("src", this._link);
    this._element.querySelector(".grid__img").setAttribute("alt", this._alt);
    this._element.querySelector(".grid__card-title").textContent = this._name;

    this._element.setAttribute("card-id", this._id);
    this._element.setAttribute("isLiked", this._isLiked);

    if (this._isLiked) {
      this._element
        .querySelector(".grid__like-icon")
        .classList.add("grid__like-icon_active");
    }

    return this._element;
  }

  generateCard() {
    return this._setTemplate();
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".grid__like-icon");
    likeButton.classList.toggle("grid__like-icon_active");
  }

  _handleRemoveCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__like-icon")
      .addEventListener("click", () => {
        this._changeLikeCardStateAtApi(this._id, this._isLiked);
        this._handleLikeClick();
      });

    this._element.querySelector(".grid__img").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link, this._alt);
    });

    this._element
      .querySelector(".grid__delete-icon")
      .addEventListener("click", () => {
        this._handleOpenDeleteConfirmationPopup(
          this._id,
          this._handleRemoveCard.bind(this)
        );
      });
  }
}
