import { editPopupInstance } from "./index.js";

export default class UserInfo {
  constructor(userInfo) {
    this._nameElement = userInfo.name;
    this._aboutElement = userInfo.about;
  }

  getUserInfo() {
    return {
      name: this._nameElement,
      about: this._aboutElement,
    };
  }

  setUserInfo({ name, about }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._aboutElement.textContent = about;
    }
    editPopupInstance.close();
  }

  renderUserInfo(nameClassSelector, aboutClassSelector) {
    document.querySelector(nameClassSelector).textContent = this._nameElement;
    document.querySelector(aboutClassSelector).textContent = this._aboutElement;
  }
}
