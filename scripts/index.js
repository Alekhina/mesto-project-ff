// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template');

function createCard(card, callbackFnc) {
    const cardElement = cardTemplate.content.cloneNode(true);
  
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__description').querySelector('.card__title').textContent = card.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      callbackFnc(deleteButton);
    });
  
    return cardElement;
  }
  
  function deleteCard(evt) {
    const listItem = evt.closest('.places__item');
    listItem.remove();
  }
  
  const container = document.querySelector('.places').querySelector('.places__list');
  
  initialCards.forEach(function(element) {
    container.append(createCard(element, deleteCard));
  });