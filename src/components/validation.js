const showInputError = (formElement, inputElement, errorMessage, 
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement,
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement,
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
    );
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,
      formSelector, inputSelector, submitButtonSelector, 
      inactiveButtonClass, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement,
      formSelector, inputSelector, submitButtonSelector, 
      inactiveButtonClass, inputErrorClass, errorClass
    );
  }
};

const hasInvalidInput = (inputList,
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement,
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement,
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement,
    formSelector, inputSelector, submitButtonSelector, 
    inactiveButtonClass, inputErrorClass, errorClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement,
        formSelector, inputSelector, submitButtonSelector, 
        inactiveButtonClass, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement,
        formSelector, inputSelector, submitButtonSelector, 
        inactiveButtonClass, inputErrorClass, errorClass);
    });
  });
};

export const enableValidation = (formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass, formSet) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(formSet));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, formSelector, inputSelector, submitButtonSelector, 
        inactiveButtonClass, inputErrorClass, errorClass);
    });
  });
};

export const clearValidation = (formElement,
  formSelector, inputSelector, submitButtonSelector, 
  inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement,
      formSelector, inputSelector, submitButtonSelector, 
      inactiveButtonClass, inputErrorClass, errorClass);
  });
  toggleButtonState(inputList, buttonElement,
    formSelector, inputSelector, submitButtonSelector, 
    inactiveButtonClass, inputErrorClass, errorClass);
};
