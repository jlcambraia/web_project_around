import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
    this._setEventListeners();
  }

  open(caption, image, alt) {
    this._popupImage.setAttribute("src", image);
    this._popupImage.setAttribute("alt", alt);
    this._popupCaption.textContent = caption;
    super.open();
  }

  _setEventListeners() {
    super._setEventListeners();
  }
}
