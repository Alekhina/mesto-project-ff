import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { closePopup, openPopup } from "./components/modal.js";
import { getUserInfo, getInitialCards, patchUserInfo,
        postCard, deleteCardFromServer, patchAvatar } from "./components/api.js";

// export { user_id }
// import { resolve } from "core-js/fn/promise";
// import { initialCards } from "./components/cards.js"; // Импорт массива карточек

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

// Добавляем начальные карточки
// initialCards.forEach(function(element) {
//   container.append(createCard(element, deleteCard, likeCard, handleImageClick));
// });

//-----------------------------------------------------------------------------------------------------
//Обратботка кнопки Сохранить в форме редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  // profileTitleName.textContent = nameInput.value;
  // profileDescription.textContent = jobInput.value;
  const popup = evt.target.closest(".popup");
  closePopup(popup);
  renderLoading(true);
  patchUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
       profileTitleName.textContent = data.name;
       profileDescription.textContent = data.about;
    })
    .catch((error) => {
      console.error("Произошла ошибка при редактировании имени:", error);
    })
    .finally(() => {
      renderLoading(false);
    }); 
}

formEditElement.addEventListener("submit", handleFormEditSubmit);
//--------------------------------------------------------------------------------------
// Вешает обработчик клика на карточку
function handleImageClick(card, title, link) {
  const cardImage = card.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    const popupTypeImage = document.querySelector(".popup_type_image");
    const popupImage = popupTypeImage.querySelector(".popup__image");
    const popupCaption = popupTypeImage.querySelector(".popup__caption");

    popupImage.setAttribute("src", link);
    popupImage.setAttribute("alt", title);
    popupCaption.textContent = title;

    openPopup(popupTypeImage);
  });
}
// Обработка кнопки Сохранить в форме добавления карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  const popup = evt.target.closest(".popup");
  const button = popup.querySelector(".popup__button");
  button.disabled = true;
  button.classList.add("popup__button_inactive");
  closePopup(popup);
  // container.prepend(
  //   createCard(newCard, deleteCard, likeCard, handleImageClick, userId)
  // );

  cardNameInput.value = "";
  cardUrlInput.value = "";
  renderLoading(true);
  postCard(newCard)
    .then((data) => {
      container.prepend(
        createCard(data, deleteCard, likeCard, handleImageClick, userId)
      );
    })
    .finally(() => {
      renderLoading(false);
    }); 
}

formAddElement.addEventListener("submit", handleFormAddSubmit);

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const popup = evt.target.closest(".popup");
  renderLoading(true);
  patchAvatar(avatarLinkInput)
    .then((data) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => {
    console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false);
    }); 
  closePopup(popup);
}
formAvatarElement.addEventListener("submit", handleFormAvatarSubmit);
//------------------------------------------------------------------------------------------------
// Открытие попапа редактирования
profileEditButton.addEventListener("click", () => {
  openPopup(document.querySelector(".popup_type_edit"));
  fillProfileForm();
  clearValidation(formEditElement);
});

// Открытие попапа добавления картинки
profileAddButton.addEventListener("click", () => {
  openPopup(document.querySelector(".popup_type_new-card"));
  clearValidation(formAddElement);
});

// Открытие попапа редактирования аватарки
profileImage.addEventListener("click", () => {
  openPopup(document.querySelector('.popup_type_avatar'));
  clearValidation(formAvatarElement);
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

function renderLoading(isLoading) {
  if (isLoading) {
    const buttons = document.querySelectorAll('.popup__button');
    buttons.forEach((button) => {
      button.textContent = "Сохранение...";
    })
  }
  else {
    const buttons = document.querySelectorAll('.popup__button');
    buttons.forEach((button) => {
      button.textContent = "Сохранить";
    })
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

//--------------------------------------------------------------------------------------------------------
//ВАЛИДАЦИЯ

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
    );
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

const clearValidation = (formElement) => {
  const buttonElement = formElement.querySelector(".popup__button");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

enableValidation();
