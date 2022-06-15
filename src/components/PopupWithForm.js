import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('form');
        this._submitBtn = this._form.querySelector('.popup__button');
        this._submitBtnText = this._submitBtn.textContent;
    }

    _getInputValues() {
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    loading(toggle){
        if(toggle){
            this._submitBtn.textContent = 'Сохранение...';
        }else{
            this._submitBtn.textContent = this._submitBtnText;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}