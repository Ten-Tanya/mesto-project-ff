
const placesList = document.querySelector('.places__list')


function Card(CardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = CardData.link;
    cardElement.querySelector('.card__image').alt = CardData.name;
    cardElement.querySelector('.card__title').textContent = CardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement
}

function createCard(name, link) {
    cardData = {
        name,
        link
    }
    placesList.append(Card(cardData, deleteCard))
}

initialCards.forEach(elem => createCard(elem.name, elem.link));



// @todo: Функция удаления карточки
function deleteCard(event) {
    const cardItem = event.target.closest('.places__item');
    cardItem.remove();
}

// @todo: Вывести карточки на страницу
