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

//Константы для профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const userNameElement = document.querySelector(".profile__name");
const userOccupationElement = document.querySelector(".profile__occupation");
const addNewPlaceButton = document.querySelector(".profile__add-button");

//Константы для попапов
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileCloseButton = document.querySelector(
  ".popup__close_loc_edit-profile"
);
const addNewPlacePopup = document.querySelector(".popup_type_add-place");
const closeNewPlaceButton = document.querySelector(
  ".popup__close_loc_new-place"
);

//Константы для формы редактирования профиля
const formEditProfile = document.querySelector(".popup__form_loc_profile");
const userNameInput = document.querySelector("#user-name-input");
const userOccupationInput = document.querySelector("#user-occupation-input");
const saveButton = document.querySelector(".popup__button_type_save-profile");

//Константы для формы добавления нового места
const formNewPlace = document.querySelector(".popup__form_loc_new-place");
const newPlaceNameInput = document.querySelector("#new-place-name-input");
const newPlaceUrlInput = document.querySelector("#new-place-url-input");
const addPlaceButton = document.querySelector(".popup__button_type_add-place");

//Шаблон карточки, её добавление (и удаление) в блок Elements
const cards = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card").content;

function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardName = newCard.querySelector(".item__heading");
  cardName.textContent = card.name;
  const cardImage = newCard.querySelector(".item__picture");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", `Фото ${card.name}`);
  const deleteCardButton = newCard.querySelector(".item__trash");
  deleteCardButton.addEventListener("click", handleDeleteCardButton);
  cards.append(newCard);
}

initialCards.forEach(createCard);

//Управление удалением карточки
function handleDeleteCardButton(event) {
  const button = event.target;
  const card = button.closest(".item");
  card.remove();
}

//Слушатель события на кнопку открытия попапа редактирования профиля по клику
editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
});

//Слушатель события на кнопку закрытия попапа редактирования профиля по клику на крестик
editProfileCloseButton.addEventListener("click", function () {
  closePopup(editProfilePopup);
});

//Слушатель события на кнопку добавления нового места
addNewPlaceButton.addEventListener("click", function () {
  openPopup(addNewPlacePopup);
});

//Слушатель события закрытия попапа добавления нового места по клику на крестик
closeNewPlaceButton.addEventListener("click", function () {
  closePopup(addNewPlacePopup);
});

//Функция, которая добавляет класс с правилом flex, открывает попап
//и отображает в форме текущие значения имени и профессии
function openPopup(popup) {
  popup.classList.add("popup_opened");
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
}

//Функция, которая удаляет класс с правилом flex
//и закрывает попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Функция сабмита формы редактирования профиля
function changeUser(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closePopup(editProfilePopup);
}

//Создаём слушатель события на отправку введённых данных
formEditProfile.addEventListener("submit", changeUser);

//Функция сабмита добавления нового места
