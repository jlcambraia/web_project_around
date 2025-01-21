export default class Api {
  constructor(apiConfig) {
    this._baseURL = apiConfig.baseUrl;
    this._userToken = apiConfig.token;
  }
  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
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
    return fetch(`${this._baseURL}/cards`, {
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

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]).then(
      ([userInfo, cards]) => {
        return { userInfo, cards };
      }
    );
  }

  updateUserInfo(updatedName, updatedAbout) {
    if (!updatedName || !updatedAbout) {
      console.log("Nome e/ou Sobre não podem estar vazios");
      return;
    }

    return fetch(`${this._baseURL}/users/me`, {
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
    return fetch(`${this._baseURL}/cards`, {
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
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
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
    return fetch(`${this._baseURL}/cards/${cardId}`, {
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
    return fetch(`${this._baseURL}/users/me/avatar`, {
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
