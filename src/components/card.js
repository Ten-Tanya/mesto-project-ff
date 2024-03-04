
export function createCard(CardData, deleteCard, likeCard, imgPopeup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = CardData.link;
  cardElement.querySelector('.card__image').alt = CardData.name;
  cardElement.querySelector('.card__title').textContent = CardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => imgPopeup(CardData.name,CardData.link));
  return cardElement
};

export function deleteCard(event) {
  const cardItem = event.target.closest('.places__item');
  cardItem.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}


