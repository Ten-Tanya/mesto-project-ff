
const placesList = document.querySelector('.places__list')


initialCards.forEach(function(item) {

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.places__item').cloneNode(true);

card.querySelector('.card__image').src = item.link;
card.querySelector('.card__title').textContent = item.name;
card.querySelector('.card__delete-button').addEventListener('click', deleteCard);

placesList.append(card)
})




// @todo: Функция удаления карточки
function deleteCard() {
    const cardItem = document.querySelector('.card__delete-button').closest('.places__item');
    cardItem.remove();
}

// @todo: Вывести карточки на страницу
