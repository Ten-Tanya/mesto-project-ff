
import { userID } from ".";
import { addLikeCard, deleteLikeCard, deleteCardApi } from "./api";

export function createCard(CardData, deleteCardEvt, renderLikes, imgPopeup, userID) {
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
  if (userID !== CardData.owner._id) 
  { deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }
  deleteButton.addEventListener('click', deleteCardEvt);
  
// Проверка наличия лайка пользователя в массиве likes
const isLiked = CardData.likes.some((like) => like._id === userID);
if (isLiked) {
  likeButton.classList.add("card__like-button_is-active");
}
//слушатель лайка для карточки
  likeButton.addEventListener('click', () => renderLikes(likesCount, likeButton, CardData));

//слушатель открытия попапа с картинкой
  cardElement.querySelector('.card__image').addEventListener('click', () => imgPopeup(CardData.name,CardData.link));
  return cardElement
};

//удалить карточку
export function deleteCardEvt(event) {
  const cardItem = event.target.closest('.places__item');
  cardItem.remove();
}

export function deleteCard(cardElement, cardID){
  deleteCardApi(cardID)
  .then(()=> {
    cardElement.remove()
    console.log(cardElement)
  })
  .catch((err) => {
    console.error("Произошла ошибка при удалении карточки:", err);
  })
}



//удалить карточку
export function handleDeleteCard(evt) {
  evt.preventDefault();
  const cardItem = evt.target.closest('.places__item');
  deleteCard(cardItem, cardID)
}



//поставить лайк карточке
//export function likeCard(evt) { 
 // if(evt.target.classList.contains('card__like-button_is-active')) {
//    evt.target.classList.remove('card__like-button_is-active');
//}
//else {
//    evt.target.classList.add('card__like-button_is-active');
//}
//}


// Функция подсчета лайков
export function renderLikes(likesCount, likeButton, CardData) {

  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(CardData._id)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении лайка:", err);
    });
  } else {
    addLikeCard(CardData._id)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении лайка:", err);
    });
  }
}




