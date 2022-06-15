export class FormValidator {
    constructor(settings, form) {
        this.settings = settings;
        this.form = form;
    }

    _isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, this.settings);
        } else {
            this._hideInputError(formElement, inputElement, this.settings);
        }
    };

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.textContent = errorMessage.split('.')[0] + '.';
        errorElement.classList.add(this.settings.errorClass);
    };

    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.settings.inactiveButtonClass);
            buttonElement.setAttribute("disabled", "disabled");
        } else {
            buttonElement.classList.remove(this.settings.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this.settings.inputSelector));
        const buttonElement = formElement.querySelector(this.settings.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, this.settings);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement, this.settings);
                this._toggleButtonState(inputList, buttonElement, this.settings);
            });
        });
    };

    enableValidation() {
        this._setEventListeners(this.form);
    };
}