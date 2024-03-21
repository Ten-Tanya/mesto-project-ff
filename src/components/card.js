

import { addLikeCard, deleteLikeCard, deleteCardApi } from "./api";

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
  if (userID !== CardData.owner._id) 
  { deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }
  deleteButton.addEventListener('click', () => deleteCard(cardElement, CardData._id));
  
// Проверка наличия лайка пользователя в массиве likes
const isLiked = CardData.likes.some((like) => like._id === userID);
if (isLiked) {
  likeButton.classList.add("card__like-button_is-active");
}
//слушатель лайка для карточки
  likeButton.addEventListener('click', () => renderLikes(likeButton,likesCount, CardData._id));

//слушатель открытия попапа с картинкой
  cardElement.querySelector('.card__image').addEventListener('click', () => imgPopeup(CardData.name,CardData.link));
  
  return cardElement
};


export function deleteCard(cardElement, cardID){
  deleteCardApi(cardID)
  .then(()=> {
    cardElement.remove()
  })
  .catch((err) => {
    console.log( err);
  })
}


// Функция подсчета лайков
export function renderLikes(likeButton,likesCount, id) {
  
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(id)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    addLikeCard(id)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}




