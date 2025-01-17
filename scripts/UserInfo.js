import { editPopupInstance } from "./index.js";

export default class UserInfo {
  constructor(userInfo) {
    this._nameElement = userInfo.name;
    this._aboutElement = userInfo.about;
    this._idElement = userInfo._id;
    this._avatarElement = userInfo.avatar;
  }

  getUserInfo() {
    return {
      name: this._nameElement,
      about: this._aboutElement,
      id: this._idElement,
      avatar: this._avatarElement,
    };
  }

  setUserInfo(
    { name, about, avatar },
    nameClassSelector,
    aboutClassSelector,
    avatarClassSelector
  ) {
    if (name) {
      this._nameElement = name;
      document.querySelector(nameClassSelector).textContent = name;
    }
    if (about) {
      this._aboutElement = about;
      document.querySelector(aboutClassSelector).textContent = about;
    }
    if (avatar) {
      this._avatarElement = avatar;
      document.querySelector(avatarClassSelector).src = avatar;
    }
    editPopupInstance.close();
  }
}
