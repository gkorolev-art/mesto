import { initialCards, validationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

//ПРОФИЛЬ
const profileEditButton = document.querySelector(".profile__edit-button");
const userNameElement = document.querySelector(".profile__name");
const userOccupationElement = document.querySelector(".profile__occupation");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupFormEditProfile = document.querySelector(
  ".popup__form_place_profile"
);
const popupUserNameInput = document.querySelector("#user-name-input");
const popupUserOccupationInput = document.querySelector(
  "#user-occupation-input"
);

//КАРТОЧКИ МЕСТ
const newPlaceAddButton = document.querySelector(".profile__add-button");
const popupNewPlace = document.querySelector(".popup_type_add-place");
const popupFormNewPlace = document.querySelector(
  ".popup__form_place_new-place"
);
const popupNewPlaceNameInput = document.querySelector("#new-place-name-input");
const popupNewPlaceUrlInput = document.querySelector("#new-place-url-input");

//ПОЛНОРАЗМЕРНОЕ ИЗОБРАЖЕНИЕ
const popupPicture = document.querySelector(".popup_type_full-size-picture");
const popupPictureElement = popupPicture.querySelector(".popup__picture");
const popupPictureCaption = popupPicture.querySelector(".popup__caption");

//СЕТКА КАРТОЧЕК
const cardsGrid = document.querySelector(".elements__list");

//ВСЕ попапы и ВСЕ крестики
const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close");

//Функция создания карточки
const createCard = (data) => {
  const card = new Card(data, "#card", handleFullsizePicture);

  return card.generateCard();
};

//Управление открытием полноэкранного изображения
const handleFullsizePicture = (cardPicture) => {
  openPopup(popupPicture);
  popupPictureElement.src = cardPicture.link;
  popupPictureElement.alt = cardPicture.name;
  popupPictureCaption.textContent = cardPicture.name;
};

//Функция добавления нового места в начало
const renderCard = (cardItem) => {
  cardsGrid.prepend(createCard(cardItem));
};

//Создание карточек по умолчанию в порядке массива
initialCards.forEach((cardItem) => {
  cardsGrid.append(createCard(cardItem));
});

//Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClosePopup);
};

//Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClosePopup);
};

//Универсальное закрытие любого попапа при клике на крестик
closePopupButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    const closestPopup = event.target.closest(".popup");
    closePopup(closestPopup);
  });
});

//Управление закрытием попапов при клике на Esc
const handleEscClosePopup = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//Закрытие попапа при клике на overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

//Функция открытия попапа редактирования профиля по клику
profileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  popupUserNameInput.value = userNameElement.textContent;
  popupUserOccupationInput.value = userOccupationElement.textContent;
  profileFormValidator.resetValidation();
});

//Функция сабмита формы редактирования профиля
popupFormEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  userNameElement.textContent = popupUserNameInput.value;
  userOccupationElement.textContent = popupUserOccupationInput.value;
  closePopup(popupEditProfile);
});

//Функция открытия попапа добавления нового места
newPlaceAddButton.addEventListener("click", () => {
  openPopup(popupNewPlace);
});

//Функция сабмита и сохранения нового места
popupFormNewPlace.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCard({
    name: popupNewPlaceNameInput.value,
    alt: `Фото .${popupNewPlaceNameInput.value}`,
    link: popupNewPlaceUrlInput.value,
  });
  popupFormNewPlace.reset();
  newPlaceFormValidator.resetValidation();
  closePopup(popupNewPlace);
});

const profileFormValidator = new FormValidator(
  validationConfig,
  popupFormEditProfile
);
profileFormValidator.enableValidation();

const newPlaceFormValidator = new FormValidator(
  validationConfig,
  popupFormNewPlace
);
newPlaceFormValidator.enableValidation();
