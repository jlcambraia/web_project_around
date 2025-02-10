export default class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.getAttribute("src"),
    };

    return userInfo;
  }

  setUserInfo(inputName, inputAbout, inputAvatar) {
    if (inputName) {
      this._userName.textContent = inputName;
    }
    if (inputAbout) {
      this._userAbout.textContent = inputAbout;
    }
    if (inputAvatar) {
      this._userAvatar.setAttribute("src", inputAvatar);
    }
  }
}
