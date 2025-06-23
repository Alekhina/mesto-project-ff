import { putLike, deleteLike, deleteCardFromServer } from './api.js';
// import { user_id } from '../index.js;'
export { createCard, deleteCard, likeCard };


// Создает карточку по переданным name и link, вешает на нее обработчики лайка, клика и кнопку удаления
function createCard(card, deleteCardFnk, likeCardFnk, handleImageClickFnk, userId) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
  
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__description').querySelector('.card__title').textContent = card.name;
    // const likesCounter = 
    cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      deleteCardFnk(deleteButton, card);
    });
    likeCardFnk(cardElement, card, cardElement.querySelector('.card__like-counter'));

    if (card.owner._id !== userId)  {
      cardElement.querySelector('.card__delete-button').style.display = 'none';
    }  
    

    handleImageClickFnk(cardElement, card.name, card.link);
    return cardElement;
}

// Удаляет переданную карточку
function deleteCard(evt, card) {
  const listItem = evt.closest('.places__item');
  listItem.remove();
  deleteCardFromServer(card._id);
}

// Вешает обработчик лайка на карточку
function likeCard(cardElement, card, cardLikeCounter) {
  cardElement.querySelector('.card__like-button').addEventListener('click', 
    (evt) => {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      deleteLike(card._id)
        .then((data) => {
          cardLikeCounter.textContent = data.likes.length;
        })
        .catch((err) => console.error('Ошибка при удалении лайка:', err));
    }
    else {
      putLike(card._id)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
      })
      .catch((err) => console.error('Ошибка при добавлении лайка:', err));
    }
    evt.target.classList.toggle('card__like-button_is-active');
  });
}

