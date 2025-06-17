import { openPopup } from "./modal";
export { createCard, deleteCard, likeCard, handleImageClick };


// Создает карточку по переданным name и link, вешает на нее обработчики лайка, клика и кнопку удаления
function createCard(card, deleteCardFnk, likeCardFnk, handleImageClickFnk) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
  
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__description').querySelector('.card__title').textContent = card.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      deleteCardFnk(deleteButton);
    });
    likeCardFnk(cardElement);
    handleImageClickFnk(cardElement, card.name, card.link);
    return cardElement;
}

// Удаляет переданную карточку
function deleteCard(evt) {
  const listItem = evt.closest('.places__item');
  listItem.remove();
}

// Вешает обработчик лайка на карточку
function likeCard(card) {
    // console.log(card.querySelector('.card__like-button'));
  card.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });
}

// Вешает обработчик клика на карточку
function handleImageClick(card, title, link) {
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        const popupTypeImage = document.querySelector('.popup_type_image');
        const popupImage = popupTypeImage.querySelector('.popup__image');
        const popupCaption = popupTypeImage.querySelector('.popup__caption');

        popupImage.setAttribute('src', link);
        popupImage.setAttribute('alt', title);
        popupCaption.textContent = title;

        openPopup(popupTypeImage);
    });
}