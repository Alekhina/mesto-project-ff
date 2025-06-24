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
    cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      deleteCardFnk(deleteButton, card);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
      const likeButton = evt.target;
      const cardLikeCounter = evt.target.closest('.card__like').querySelector('.card__like-counter');
      likeCardFnk(likeButton, card, cardLikeCounter);
    });

    if (card.owner._id !== userId)  {
      cardElement.querySelector('.card__delete-button').style.display = 'none';
    }
    
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      handleImageClickFnk(card.name, card.link)
    })
    return cardElement;
}

// Удаляет переданную карточку
function deleteCard(evt, card) {
  const listItem = evt.closest('.places__item');
  console.log(card);
  deleteCardFromServer(card._id)
  .then(() => {
    console.log(card._id);
    listItem.remove();
  })
  .catch((err) => console.error('Ошибка при удалении карточки:', err));
}

// Вешает обработчик лайка на карточку
function likeCard(likeButton, card, cardLikeCounter) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(card._id)
    .then((data) => {
      cardLikeCounter.textContent = data.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
    })
    .catch((err) => console.error('Ошибка при удалении лайка:', err));
  }
  else {
    putLike(card._id)
    .then((data) => {
      cardLikeCounter.textContent = data.likes.length;
      likeButton.classList.add('card__like-button_is-active');
    })
    .catch((err) => console.error('Ошибка при добавлении лайка:', err));
  }
}
