export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}users/me`, {
            headers: this.headers
        })
            .then(this._getResponseData)
    }

    getCards() {
        return fetch(`${this.baseUrl}cards`, {
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    setUserInfo(data) {
        return fetch(`${this.baseUrl}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    }

    createCard(data) {
        return fetch(`${this.baseUrl}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(data) {
        return fetch(`${this.baseUrl}cards/${data}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    likeCard(data) {
        return fetch(`${this.baseUrl}cards/likes/${data}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    dislikeCard(data) {
        return fetch(`${this.baseUrl}cards/likes/${data}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    setAvatar(data) {
        return fetch(`${this.baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data),
        })
            .then(this._getResponseData)
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}