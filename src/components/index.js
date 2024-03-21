import '../pages/index.css';
//import {initialCards} from './cards';
import { createCard, deleteCardEvt, likeCard, toggleDeleteButton, toggleLikeButton, renderLikes, handleDeleteCard } from './card';
import { openPopup, closePopup, escapeHandler, } from './modal';
import { enableValidation, clearValidation } from './validation';
import { 
    config, 
    handleResponse, 
    updateAvatar, 
    updateProfileData, 
    createNewCard,
    getPersonalData,
    getCards,
    addLikeCard,
    deleteLikeCard  
     } from './api';

const placesList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePic = document.querySelector('.profile__image');

//modal
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

//форма редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

// форма добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');


const imagePopeup = document.querySelector('.popup_type_image');

//форма изменения аватара
const editImagePopup = document.querySelector('.popup_type_edit_image');
const editImageForm = document.querySelector('.popup__form[name="new-avatar"]');
const imageInput = editImageForm.querySelector('.popup__input_type_url');

const validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
}

let userID ;

//задаем данные для профиля
function setProfileData(user) {
          profileName.textContent = user.name;
          profileDescription.textContent = user.about;
          profilePic.setAttribute('style', `background-image:url(${user.avatar})`);
          userID = user._id;
    }
      

// функция отображения карточек    
function renderCard(CardData, userID ) {
  
    const cardItem = createCard(CardData, deleteCardEvt, renderLikes, imgPopeup, userID);
    placesList.append(cardItem)
  }

//функция открытия попапа с картинкой 
function imgPopeup(name,link) {
    openPopup(imagePopeup);
    imagePopeup.querySelector('.popup__image').src = link;
    imagePopeup.querySelector('.popup__caption').textContent = name;
    imagePopeup.querySelector('.popup__image').alt = name;
  };

//установка значений данных профиля
function setIEditFormValues(User) {
    if (User) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
    }
  }

//функция редактирования профиля
function editFormSubmit(evt) {
    evt.preventDefault();
    editForm.querySelector('.popup__button').textContent = "Сохранение..."; 
    updateProfileData(nameInput, jobInput)
    .then((user)=>{
        setIEditFormValues(user)
        closePopup (editPopup)
    })
    .finally(()=> {
    editForm.querySelector('.popup__button').textContent = "Сохранить"})
    
}


//функция добавления новой карточки
function newPlaceFormSubmit(evt){
    evt.preventDefault();
    newPlaceForm.querySelector('.popup__button').textContent = "Сохранение...";
    const data = {
        name: placeInput.value,
        link: linkInput.value
    }
    createNewCard(data)
    .then((data) =>{
        const cardItem = createCard(data, handleDeleteCard, renderLikes, imgPopeup, userID);
        placesList.prepend(cardItem);
        newPlaceForm.reset();
        closePopup(addPopup)
    })
    .finally(()=> {
        editForm.querySelector('.popup__button').textContent = "Сохранить"})
    
}

//Функция для изменения аватара
function updateAvatarSubmit(evt) {
    evt.preventDefault();
    editImageForm.querySelector('.popup__button').textContent = "Сохранение..."; 
    updateAvatar(imageInput)
    .then((res) => {
        profilePic.setAttribute('style', `background-image:url(${res.avatar})`)
        closePopup(editImagePopup) 
    })
    .finally(()=> {
        editImageForm.querySelector('.popup__button').textContent = "Сохранить"})
}

//открытие попапа данных профиля
editButton.addEventListener('click', function(){
    openPopup(editPopup);
    clearValidation(editForm, validationConfig);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
})

//закрытие попапов
closeButtons.forEach(button => button.addEventListener('click', function(evt){
        const popup = evt.target.closest('.popup_is-opened');
        closePopup(popup)
    })
)
//закрытие попапов
popups.forEach(popup => popup.addEventListener('click', function(evt){
    const openedModal = evt.target.closest('.popup_is-opened')
    if (evt.target === openedModal){
        closePopup(openedModal)
    }
}))

//открытие попапа добавления новой карточки
addButton.addEventListener('click', function(){
    clearValidation(newPlaceForm, validationConfig)
    openPopup(addPopup)
})

//открытие попапа изменения аватара
profilePic.addEventListener('click', function(){
    clearValidation(editImageForm, validationConfig)
    openPopup(editImagePopup)
})


editForm.addEventListener('submit', editFormSubmit);
newPlaceForm.addEventListener('submit', newPlaceFormSubmit);
editImageForm.addEventListener('submit', updateAvatarSubmit);

enableValidation(validationConfig);


//промис получения данных карточек и пользователя
Promise.all([getPersonalData(), getCards()])
.then(([userID, cards]) => {
    setProfileData(userID);
    cards.forEach((card) => {renderCard(card, userID)});
 })
.catch((err) => {
 console.log("Произошла ошибка при получении данных:", err);
 });



