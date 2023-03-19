const validationconfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  submitButtonDisabledClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

const handleErrorShowing = (event, validationconfig) => {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`.${inputId}-error`);

  if (!input.validity.valid) {
    input.classList.add(validationconfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  } else {
    input.classList.remove(validationconfig.inputErrorClass);
    errorElement.textContent = "";
  }
};

const toggleButtonState = (formElement, validationconfig) => {
  const submitButton = formElement.querySelector(
    validationconfig.submitButtonSelector
  );
  const isFormValid = formElement.checkValidity();
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(
    validationconfig.submitButtonDisabledClass,
    !isFormValid
  );
};

const setInputListeners = (formElement, validationconfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationconfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      handleErrorShowing(event, validationconfig);
    });
  });
};

const enableValidation = (validationconfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationconfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    formElement.addEventListener("input", () => {
      toggleButtonState(formElement, validationconfig);
    });
    setInputListeners(formElement, validationconfig);
    toggleButtonState(formElement, validationconfig);
  });
};

enableValidation(validationconfig);
