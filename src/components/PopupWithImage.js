import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-image__image');
    this._popupTitle = this._popup.querySelector('.popup-image__title');
  }

  open(name, link) {
    this._popupTitle.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }
}