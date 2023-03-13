//Массив загружаемых по умолчанию карточек
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
  },
];

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
const popupPicture = document.querySelector(".popup_type_full-size-pictire");
const popupPictureElement = popupPicture.querySelector(".popup__picture");
const popupPictureCaption = popupPicture.querySelector(".popup__caption");

//СЕТКА КАРТОЧЕК И ШАБЛОН КАРТОЧКИ
const cardsGrid = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card").content;

//ВСЕ попапы и ВСЕ крестики
const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close");

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

//Функция открытия попапа редактирования профиля по клику
profileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  popupUserNameInput.value = userNameElement.textContent;
  popupUserOccupationInput.value = userOccupationElement.textContent;
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
  popupNewPlaceNameInput.value = "";
  popupNewPlaceUrlInput.value = "";
});

//Функция сабмита и сохранения нового места
popupFormNewPlace.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCard({
    name: popupNewPlaceNameInput.value,
    alt: popupNewPlaceNameInput.value,
    link: popupNewPlaceUrlInput.value,
  });
  closePopup(popupNewPlace);
});

//Управление открытием полноэкранного изображения
const handleFullsizePicture = (cardPicture) => {
  cardPicture.addEventListener("click", (event) => {
    openPopup(popupPicture);
    popupPictureElement.src = cardPicture.src;
    popupPictureElement.alt = cardPicture.alt;
    popupPictureCaption.textContent = event.target.closest(".item").textContent;
  });
};

//Функция добавления нового места в начало
const renderCard = (cardItem) => {
  cardsGrid.prepend(createCard(cardItem));
};

//Управление удалением карточки
const handleDeleteCard = (cardItem) => {
  cardItem.addEventListener("click", (event) => {
    event.target.closest(".item").remove();
  });
};

//Управление лайком карточки
const handleLikeCard = (likeButton) => {
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("item__like_active");
  });
};

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
const createCard = (cardItem) => {
  const newCard = cardTemplate.cloneNode(true);
  const nameNewCard = newCard.querySelector(".item__heading");
  const pictureNewCard = newCard.querySelector(".item__picture");
  const deleteCardButton = newCard.querySelector(".item__trash");
  const likeCardButton = newCard.querySelector(".item__like");

  nameNewCard.textContent = cardItem.name;
  pictureNewCard.setAttribute("src", cardItem.link);
  pictureNewCard.setAttribute("alt", `Фото ${cardItem.name}`);

  handleLikeCard(likeCardButton);
  handleDeleteCard(deleteCardButton);
  handleFullsizePicture(pictureNewCard);

  return newCard;
};

//Создание карточек по умолчанию в порядке массива
initialCards.forEach((cardItem) => {
  cardsGrid.append(createCard(cardItem));
});
