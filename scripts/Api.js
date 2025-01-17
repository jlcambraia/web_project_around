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

  saveNewCards(newCardTitle, newCardLink) {
    return fetch(`${this._apiLinkSelector}cards`, {
      method: "POST",
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCardTitle,
        link: newCardLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeIsLiked(isLiked, cardId) {
    return fetch(`${this._apiLinkSelector}cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
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

  deleteCard(cardId) {
    return fetch(`${this._apiLinkSelector}cards/${cardId}`, {
      method: "DELETE",
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

  updateProfilePicture(avatarUrl) {
    return fetch(`${this._apiLinkSelector}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
