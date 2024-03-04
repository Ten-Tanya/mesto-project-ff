import '../pages/index.css';
import {initialCards} from './cards';
import { createCard, deleteCard, likeCard } from './card';
import { openPopup, closePopup, escapeHandler, } from './modal';


const placesList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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
const linkInput = document.querySelector('.popup__input_type_url')


const imagePopeup = document.querySelector('.popup_type_image');

function renderCard(name, link) {
    const data = {
        name,
        link
    }
    const cardItem = createCard(data, deleteCard, likeCard, imgPopeup);
    placesList.append(cardItem)
  }

function imgPopeup(name,link) {
    openPopup(imagePopeup);
    imagePopeup.querySelector('.popup__image').src = link;
    imagePopeup.querySelector('.popup__caption').textContent = name;
    imagePopeup.querySelector('.popup__image').alt = name;
  };

  function editFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup (editPopup)
}

function newPlaceFormSubmit(evt){
    evt.preventDefault();
    const data = {
        name: placeInput.value,
        link: linkInput.value
    }
    const cardItem = createCard(data, deleteCard, likeCard, imgPopeup);
    placesList.prepend(cardItem);
    newPlaceForm.reset();
    closePopup(addPopup)
}


initialCards.forEach(elem => renderCard(elem.name, elem.link));

editButton.addEventListener('click', function(){
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
})

closeButtons.forEach(button => button.addEventListener('click', function(evt){
        const popup = evt.target.closest('.popup_is-opened');
        closePopup(popup)
    })
)

popups.forEach(popup => popup.addEventListener('click', function(evt){
    const openedModal = evt.target.closest('.popup_is-opened')
    if (evt.target === openedModal){
        closePopup(openedModal)
    }
}))

addButton.addEventListener('click', function(){
    openPopup(addPopup)
})

editForm.addEventListener('submit', editFormSubmit);
newPlaceForm.addEventListener('submit', newPlaceFormSubmit);


