import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }
  open({ image, alt, caption }) {
    this._popupImage.setAttribute("src", image);
    this._popupImage.setAttribute("alt", alt);
    this._popupCaption.textContent = caption;

    super.open();
  }
}
