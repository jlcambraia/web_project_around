export default class Api {
  constructor(apiConfig) {
    this._apiLinkSelector = apiConfig.baseUrl;
    this._userToken = apiConfig.token;
  }
  getUserInfo() {
    return fetch(`${this._apiLinkSelector}users/me/`, {
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._apiLinkSelector}cards`, {
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }

  updateUserInfo(updatedName, updatedAbout) {
    return fetch(`${this._apiLinkSelector}users/me/`, {
      method: "PATCH",
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedName,
        about: updatedAbout,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  handleAddNewCards() {}
  handleToggleLike() {}
  handleDeleteCard() {}
  handleNewProfilePicture() {}
}
