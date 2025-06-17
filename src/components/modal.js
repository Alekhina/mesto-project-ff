// import { fillProfileForm } from "../index.js";
export { closePopup, openPopup, fillProfileForm,
         profileTitleName, profileDescription, nameInput, jobInput
 };

const profileTitleName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function fillProfileForm() {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closePopup(openPopup);
    };
  };
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}