class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getData(path) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  _changeData(data, path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  _handleLike(method, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this._handleLike('DELETE', id) : this._handleLike('PUT', id);
  }

  setLike(id) {
    return this._handleLike('PUT', id);
  }

  deleteLike(id) {
    return this._handleLike('DELETE', id);
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  getProfileData() {
    return this._getData('/users/me');
  }

  setProfileData(data) {
    return this._changeData(data, '/users/me');
  }

  setProfileAvatar(avatar) {
    return this._changeData(avatar, '/users/me/avatar');
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._checkResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'ee805e78-1d4c-400f-965a-b6713248630c',
    'Content-Type': 'application/json'
  }
});