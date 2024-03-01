
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const placesList = document.querySelector('.places__list')

import { openPopup } from "./modal";
import { imagePopeup } from ".";

export function createCard(CardData, deleteCard, likeCard, ImgPopeup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = CardData.link;
  cardElement.querySelector('.card__image').alt = CardData.name;
  cardElement.querySelector('.card__title').textContent = CardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => ImgPopeup(CardData.name,CardData.link));
  return cardElement
};

export function renderCard(name, link) {
  const Data = {
      name,
      link
  }
  const CardItem = createCard(Data, deleteCard, likeCard, ImgPopeup)
  placesList.append(CardItem)
}

export function deleteCard(event) {
  const cardItem = event.target.closest('.places__item');
  cardItem.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

export function ImgPopeup(name,link) {
  openPopup(imagePopeup);
  imagePopeup.querySelector('.popup__image').src = link;
  imagePopeup.querySelector('.popup__caption').textContent = name;
}

