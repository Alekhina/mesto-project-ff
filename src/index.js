import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { initialCards } from "./components/cards.js"; // Импорт массива карточек

// Объявление констант
const container = document.querySelector('.places').querySelector('.places__list');
const formEditElement = document.querySelector('form[name="edit-profile"]');
const formAddElement = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupsClose = document.querySelectorAll('.popup__close');
const popupWrappers = document.querySelectorAll('.popup__content');
const popups = document.querySelectorAll('.popup');  
    
// Добавляем начальные карточки
initialCards.forEach(function(element) {
  container.append(createCard(element, deleteCard, likeCard, handleImageClick));
});

//-----------------------------------------------------------------------------------------------------
//Обратботка кнопки Сохранить в форме редактирования 
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

formEditElement.addEventListener('submit', handleFormEditSubmit);
//--------------------------------------------------------------------------------------
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
// Обработка кнопки Сохранить в форме добавления карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCard = {
              name: cardNameInput.value,
              link: cardUrlInput.value
             };
  const popup = evt.target.closest('.popup');
  closePopup(popup);
  container.prepend(createCard(newCard, deleteCard, likeCard, handleImageClick));

  cardNameInput.value = '';
  cardUrlInput.value = '';
}

formAddElement.addEventListener('submit', handleFormAddSubmit)
//------------------------------------------------------------------------------------------------
// Открытие попапа редактирования
profileEditButton.addEventListener('click', () => {
  openPopup(document.querySelector('.popup_type_edit'));
  fillProfileForm();
});

// Открытие попапа добавления картинки
profileAddButton.addEventListener('click', () => {
  openPopup(document.querySelector('.popup_type_new-card'));
});

//Закрытие по крестику
popupsClose.forEach((popupClose) => {
  popupClose.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

//Закрытие по оверлею
popupWrappers.forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
});

popups.forEach(function(itemPopup) {
  itemPopup.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

const profileTitleName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function fillProfileForm() {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileDescription.textContent;
}