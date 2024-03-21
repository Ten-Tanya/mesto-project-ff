

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
    headers: {
      authorization: '6eba5ef3-f804-4267-951f-0432d19f4467',
      'Content-Type': 'application/json'
    }
  }

export function handleResponse(res) {
    if (res.ok) {
        return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
  }

//функция запроса массива карточек
export function getCards() {
   return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(handleResponse)
    }

//Функция получения данных для профиля
export function getPersonalData(){
   return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(handleResponse)
}     

  //Функция запроса для изменения аватара
export function updateAvatar(imageInput){
  return  fetch(`${config.baseUrl}/users/me/avatar`, {
        method:'PATCH',
        body: JSON.stringify({
            avatar: imageInput.value,
          }),
        headers: config.headers
      })
      .then(handleResponse);
}

//Функция запроса для обновления данных профиля
export function updateProfileData(nameInput, jobInput){
  return  fetch(`${config.baseUrl}/users/me`, {
        method:'PATCH',
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value,
          }),
        headers: config.headers
      })
      .then(handleResponse)
}

//Функция запроса для создания новой карточки   
export function createNewCard(newCard){
  return  fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
        }),
        headers: config.headers
      })
      .then(handleResponse)
}


  //функция добавления лайка
  export function addLikeCard(id){
   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method:'PUT',
      headers: config.headers
    })
    .then(handleResponse)
  }

  //запрос на удаление лайка
  export function deleteLikeCard(id){
   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method:'DELETE',
        headers: config.headers
      })
      .then(handleResponse)
  }

  //запрос на удаление карточки
  export function deleteCardApi(id){
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method:'DELETE',
        headers: config.headers
      })
      .then(handleResponse)
  }