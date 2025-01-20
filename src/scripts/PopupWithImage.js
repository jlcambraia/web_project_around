import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageClassSelector, captionClassSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(imageClassSelector);
    this._popupCaption = this._popup.querySelector(captionClassSelector);
  }
  open({ image, alt, caption }) {
    this._popupImage.setAttribute("src", image);
    this._popupImage.setAttribute("alt", alt);
    this._popupCaption.textContent = caption;

    super.open();
  }
}
