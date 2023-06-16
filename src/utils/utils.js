export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
}; 

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Попапы
export const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
export const popupFormAddCard = document.querySelector('.popup__form-add-card');
export const popupFormUpdateAvatar = document.querySelector('.popup__form-update-avatar');

//Поля профиля
export const profileText = document.querySelector('.profile__text');
export const profileHeading = document.querySelector('.profile__heading');
export const profileAvatar = document.querySelector('.profile__avatar');

//Кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonConfirm = document.querySelector('.popup__button-confirm');
export const buttonAvatar = document.querySelector('.profile__avatar-conteiner');
export const buttonDelete = document.querySelector('.elements__delete');

//Поля попапа
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_job');

