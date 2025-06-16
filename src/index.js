import "./pages/index.css";
import "./cards.js";

const cardTemplate = document.querySelector('#card-template');

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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

//-----------------------------------------------------------------------------------------------------

const formElement = document.querySelector('form[name="edit-profile"]');

const profileTitleName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_is-opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(evt);
}

formElement.addEventListener('submit', handleFormSubmit);

//--------------------------------------------------------------------------------------

const formAddElement = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

function handleFormAddPicture(evt) {
  evt.preventDefault();
  const newCard = {
              name: cardNameInput.value,
              link: cardUrlInput.value
             };
  initialCards.unshift(newCard);
  closePopup(evt)
  document.querySelectorAll('.places__item').forEach((element) => {
    element.remove();
  });
  initialCards.forEach(function(element) {
    container.append(createCard(element, deleteCard));
  });
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

formAddElement.addEventListener('submit', handleFormAddPicture)

//---------------------------------------------------------------------------------------------

const likeButtons = document.querySelectorAll('.card__like-button');

likeButtons.forEach(function(likeButton) {
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  })
})

  //-------------------------------------------------------------------------------------------------

const cardList = document.querySelectorAll('.places__item');

function openPopupTypeImage(evt) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');
  const card = evt.target.closest('.places__item');
  const popupImageTitle = card.querySelector('.card__title').textContent;
  const popupImageUrl = evt.target.getAttribute('src');

  popupImage.setAttribute('src',popupImageUrl);
  popupCaption.textContent = popupImageTitle;
  popupTypeImage.classList.add('popup_is-opened');
}

cardList.forEach(function(card) {
  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', openPopupTypeImage);
})

function fillProfileForm() {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileDescription.textContent;
}

function openPopupTypeEdit() {
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  popupTypeEdit.classList.add('popup_is-opened');
  fillProfileForm();
}

function openPopupTypeAdd() {
  const popupTypeAdd = document.querySelector('.popup_type_new-card');
  popupTypeAdd.classList.add('popup_is-opened');
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelector('.popup__close');
const popupCloseTwo = document.querySelector('.popup_type_new-card').querySelector('.popup__close');
const popupCloseThree = document.querySelector('.popup_type_image').querySelector('.popup__close');

profileEditButton.addEventListener('click', openPopupTypeEdit);
profileAddButton.addEventListener('click', openPopupTypeAdd);

const popupWrappers = document.querySelectorAll('.popup__content');
popupWrappers.forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
});
popupClose.addEventListener('click', closePopup);
popupCloseTwo.addEventListener('click', closePopup);
popupCloseThree.addEventListener('click', closePopup);
const popups = document.querySelectorAll('.popup');  

popups.forEach(function(itemPopup) {
  itemPopup.addEventListener('click', closePopup);
});
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      openPopup.classList.remove('popup_is-opened');
    };
  };
});
