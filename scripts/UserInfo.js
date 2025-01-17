import { editPopupInstance } from "./index.js";

export default class UserInfo {
  constructor(userInfo) {
    this._nameElement = userInfo.name;
    this._aboutElement = userInfo.about;
    this._idElement = userInfo._id;
  }

  getUserInfo() {
    return {
      name: this._nameElement,
      about: this._aboutElement,
      id: this._idElement,
    };
  }

  setUserInfo({ name, about }, nameClassSelector, aboutClassSelector) {
    if (name) {
      this._nameElement = name;
      document.querySelector(nameClassSelector).textContent = name;
    }
    if (about) {
      this._aboutElement = about;
      document.querySelector(aboutClassSelector).textContent = about;
    }
    editPopupInstance.close();
  }
}
