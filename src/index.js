import './pages/index.css';
import { createCard, renderCard, initialCards, placesList, deleteCard, likeCard, ImgPopeup } from './cards';
import { openPopup, closePopup, EscapeHandler, } from './modal';


initialCards.forEach(elem => renderCard(elem.name, elem.link));

//modal

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
export const editPopup = document.querySelector('.popup_type_edit');
export const addPopup = document.querySelector('.popup_type_new-card');
export const imagePopeup = document.querySelector('.popup_type_image');

editButton.addEventListener('click', function(){
    openPopup(editPopup);
    editPopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    editPopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
})

closeButtons.forEach(button => button.addEventListener('click', function(evt){
    popups.forEach((popup) => {
        if (popup.classList.contains('popup_is-opened'))
        closePopup(popup)
    })
}))

window.addEventListener('click', function(evt){
    const openedModal = evt.target.closest('.popup_is-opened')
    if (evt.target == openedModal){
        closePopup(openedModal)
    }
})

addButton.addEventListener('click', function(){
    openPopup(addPopup)
})

//форма редактирования профиля
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');


function handleFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closePopup (editPopup)
}

//форма добавления карточки

const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url')

function newPlaceFormSubmit(evt){
    evt.preventDefault();
    const Data = {
        name: placeInput.value,
        link: linkInput.value
    }
    const CardItem = createCard(Data, deleteCard, likeCard, ImgPopeup);
    placesList.prepend(CardItem);
    newPlaceForm.reset();
    closePopup(addPopup)
}


formElement.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newPlaceFormSubmit);


