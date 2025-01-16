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
  handleUserNewInfo() {}
  handleAddNewCards() {}
  handleToggleLike() {}
  handleDeleteCard() {}
  handleNewProfilePicture() {}
}
