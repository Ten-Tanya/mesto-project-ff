
import { userID } from ".";

export function createCard(CardData, deleteCard, renderLikes, imgPopeup, userID) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likesCount = cardElement.querySelector('.card__like_nb');
  cardElement.querySelector('.card__image').src = CardData.link;
  cardElement.querySelector('.card__image').alt = CardData.name;
  cardElement.querySelector('.card__title').textContent = CardData.name;
  likesCount.textContent = CardData.likes.length;
  //проверяем владельца карточки и убираем кнопку удаления, если карточка чужая
  if (userID !== CardData.userID) { deleteButton.remove()}
  else deleteButton.addEventListener('click', deleteCard);
  
// Проверка наличия лайка пользователя в массиве likes
const isLiked = CardData.likes.some((like) => like._id === userID);
if (isLiked) {
  likeButton.classList.add("card__like-button_is-active");
}
//слушатель лайка для карточки
  likeButton.addEventListener('click', renderLikes);

//слушатель открытия попапа с картинкой
  cardElement.querySelector('.card__image').addEventListener('click', () => imgPopeup(CardData.name,CardData.link));
  return cardElement
};

//удалить карточку
export function deleteCard(event) {
  const cardItem = event.target.closest('.places__item');
  cardItem.remove();
}

//поставить лайк карточке
export function likeCard(evt) { 
  if(evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.remove('card__like-button_is-active');
}
else {
    evt.target.classList.add('card__like-button_is-active');
}
}


