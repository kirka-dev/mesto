export class Card {
  constructor(data, cardTemplate, userId, { handleCardDelete, handleLikeClick }, handleCardClick) {
    this._id = data._id;
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._userId = userId;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    return template;
  }

  _deleteBtnShow() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete').remove();
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => this._handleCardDelete());
    this._element.querySelector('.element__cover').addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._element.querySelector('.element__like').addEventListener('click', () => this._handleLikeClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    const picturesImage = this._element.querySelector('.element__cover');
    picturesImage.src = this._link;
    picturesImage.alt = this._name;
    this._element.querySelector('.element__like').textContent = this._likes.length;
    this._setEventListeners();
    this._deleteBtnShow();
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked = data.likes.filter((item) => { return item._id == this._userId; }).length > 0;
    this._element.querySelector('.element__like').textContent = data.likes.length;
    if (this._isLiked) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._element.querySelector('.element__like').classList.remove('element__like_active');
    }
  }
}