import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup-confirm');
    }

    setFormHandler(handler) {
        this.setFormHandler = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.setFormHandler();
        });
    }
}