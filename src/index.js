import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { getUserInfo, getInitialCards, patchUserInfo,
        postCard, deleteCardFromServer, patchAvatar } from "./components/api.js";
import { clearValidation, enableValidation } from "./components/validation.js";

// Объявление констант
const container = document
  .querySelector(".places")
  .querySelector(".places__list");
const formEditElement = document.querySelector('form[name="edit-profile"]');
const formAddElement = document.querySelector('form[name="new-place"]');
const formAvatarElement = document.querySelector('form[name="update-avatar"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const avatarLinkInput = document.querySelector(".avatar-link-input");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileImage = document.querySelector('.profile__image');
const popupsClose = document.querySelectorAll(".popup__close");
const popupWrappers = document.querySelectorAll(".popup__content");
const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  formSet: '.form__set',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//--------------------------------------------------------------------------------------------------
//Обратботка кнопки Сохранить в форме редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const button = evt.target.querySelector('.popup__button');
  renderLoading(true, button);
  patchUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
       profileTitleName.textContent = data.name;
       profileDescription.textContent = data.about;
       closePopup(popupTypeEdit);
    })
    .catch((error) => {
      console.error("Произошла ошибка при редактировании имени:", error);
    })
    .finally(() => {
      renderLoading(false, button);
    }); 
}

formEditElement.addEventListener("submit", handleFormEditSubmit);
//--------------------------------------------------------------------------------------
// Вешает обработчик клика на карточку
function handleImageClick(title, link) {
  popupImage.setAttribute("src", link);
  popupImage.setAttribute("alt", title);
  popupCaption.textContent = title;
  openPopup(popupTypeImage);
}
// Обработка кнопки Сохранить в форме добавления карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  const button = popupTypeNewCard.querySelector(".popup__button");
  button.disabled = true;
  button.classList.add("popup__button_inactive");

  renderLoading(true, button);
  postCard(newCard)
    .then((data) => {
      container.prepend(
        createCard(data, deleteCard, likeCard, handleImageClick, userId)
      );
      cardNameInput.value = "";
      cardUrlInput.value = "";
      closePopup(popupTypeNewCard);
    })
    .catch((err) => console.error('Ошибка при добавлении карточки:', err))
    .finally(() => {
      renderLoading(false, button);
    }); 
}

formAddElement.addEventListener("submit", handleFormAddSubmit);

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  renderLoading(true, button);
  patchAvatar(avatarLinkInput)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closePopup(popupTypeAvatar);
    })
    .catch((err) => console.error('Ошибка при смене аватара:', err))
    .finally(() => {
      renderLoading(false, button);
    }); 
}
formAvatarElement.addEventListener("submit", handleFormAvatarSubmit);
//------------------------------------------------------------------------------------------------
// Открытие попапа редактирования
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  fillProfileForm();
  clearValidation(formEditElement, configValidation);
});

// Открытие попапа добавления картинки
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
  clearValidation(formAddElement, configValidation);
});

// Открытие попапа редактирования аватарки
profileImage.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
  clearValidation(formAvatarElement, configValidation);
})

//Закрытие по крестику
popupsClose.forEach((popupClose) => {
  popupClose.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

//Закрытие по оверлею
popupWrappers.forEach((item) => {
  item.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
});

popups.forEach(function (itemPopup) {
  itemPopup.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});
// Автозаполнение полей в форме редактирования
const profileTitleName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function fillProfileForm() {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileDescription.textContent;
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = "Сохранить";
  }
}
//------------------------------------------------------------------------------------------------------------
let userId = "";

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    cards.forEach((cardItem) => {
      container.append(
        createCard(cardItem, deleteCard, likeCard, handleImageClick, userId)
      );
    });
    userId = user._id;
    profileTitleName.textContent = user.name;
    profileDescription.textContent = user.about;
    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => console.error('Ошибка при загрузке информации о пользователе:', err));
//--------------------------------------------------------------------------------------------------------
//Валидация
enableValidation(configValidation);