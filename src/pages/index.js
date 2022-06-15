import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

let userId = null;
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21/',
  headers: {
    authorization: '4d4e24ee-ebdb-4750-a864-4f5841ca3caf',
    'Content-Type': 'application/json',
  }
})

// Валидация
const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
const setFormValidation = (form) => {
  const formValidator = new FormValidator(validationSelectors, form);
  formValidator.enableValidation();
}
formList.forEach(form => {
  setFormValidation(form);
})

const cardTemplate = document.getElementById('element');

const cardsList = new Section({
  renderer: (item) => {
    createElem(item, cardsList, userId);
  },
}, '.elements');

function createElem(data, cardList, userId) {
  const card = new Card(
    data,
    cardTemplate,
    userId,
    {
      handleCardDelete: () => handleCardDelete(card),
      handleLikeClick: () => handleLikeClick(card, data)
    },
    handleCardClick
  );
  const cardElement = card.generateCard();
  card.setLike(data);
  cardsList.addItem(cardElement);
}

const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();

const popupConfirmDelete = new PopupWithConfirm('#popup-confirm');
popupConfirmDelete.setEventListeners();

function handleCardDelete(card) {
  popupConfirmDelete.setFormHandler(() => {
    api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        popupConfirmDelete.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  });
  popupConfirmDelete.open();
}

function handleLikeClick(card, data) {
  const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
  promise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupAddElement = new PopupWithForm({
  popupSelector: '#popup-element',
  handleFormSubmit: (item) => {
    popupAddElement.loading(true);
    api.createCard(item)
      .then((data) => {
        createElem(data, cardsList, userId);
        popupAddElement.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupAddElement.loading(false);
      })
  }
});
popupAddElement.setEventListeners();

const addElementBtn = document.getElementById('add-element');
addElementBtn.addEventListener('click', () => {
  popupAddElement.open()
});

const userName = document.querySelector('.profile-info__name');
const userAbout = document.querySelector('.profile-info__about');
const userNameInp = document.querySelector('#profile-name');
const userAboutInp = document.querySelector('#profile-about');
const userAvatar = document.querySelector('.profile-info__avatar');
const editProfileBtn = document.querySelector('#edit-profile');
const user = new UserInfo(userName, userAbout, userAvatar);

const popupProfileEdit = new PopupWithForm({
  popupSelector: '#popup-profile',
  handleFormSubmit: (item) => {
    popupAddElement.loading(true);
    api.setUserInfo(item)
      .then((data) => {
        user.setUserInfo(data);
        popupProfileEdit.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupProfileEdit.loading(false);
      })
  }
});

popupProfileEdit.setEventListeners();

editProfileBtn.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  userNameInp.value = userInfo.name;
  userAboutInp.value = userInfo.about;
  popupProfileEdit.open();
});

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '#popup-avatar',
  handleFormSubmit: (item) => {
    popupAvatarEdit.loading(true);
    api.setAvatar(item)
      .then((data) => {
        userAvatar.src = data.avatar;
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(`${err}`)
      })
      .finally(() => {
        popupAvatarEdit.loading(false);
      })
  }
});

popupAvatarEdit.setEventListeners();

userAvatar.addEventListener('click', () => {
  popupAvatarEdit.open();
});

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userInfo]) => {
    userId = userInfo._id;
    user.setUserInfo(userInfo);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });