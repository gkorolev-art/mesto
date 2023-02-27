//Создаем константу для кнопки редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");

//Создаем константу для попапа
const editPopup = document.querySelector(".popup");

//Создаём константу для кнопки закрытия попапа
const editProfileCloseButton = document.querySelector(".popup__close");

//Создаём константы для имени и профессии в блоке профиль
const userNameElement = document.querySelector(".profile__name");
const userOccupationElement = document.querySelector(".profile__occupation");

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

//Шаблон карточки и её добавление в блок Elements
const cards = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card").content;

initialCards.forEach(function (place) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".item__picture").src = place.link;
  cardElement.querySelector(".item__heading").textContent = place.name;

  cards.append(cardElement);
});

//Создаём константы для формы редактирования профиля
const formEditProfile = document.querySelector(".popup__form");
const userNameInput = document.querySelector("#user-name-input");
const userOccupationInput = document.querySelector("#user-occupation-input");
const saveButton = document.querySelector(".popup__button-save");

//Создаём слушатель события на кнопку открытия попапа по клику
editProfileButton.addEventListener("click", function () {
  openPopup(editPopup);
});

//Создаём слушатель события на кнопку закрытия попапа по клику на крестик
editProfileCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

//Создаем функцию, которая добавляет класс с правилом flex, открывает попап
//и отображает в форме текущие значения имени и профессии
function openPopup(popup) {
  popup.classList.add("popup_opened");
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
}

//Создаем функцию, которая удаляет класс с правилом flex
//и закрывает попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Создаём функцию сабмита формы редактирования профиля
function changeUser(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closePopup(editPopup);
}

//Создаём слушатель события на отправку введённых данных
formEditProfile.addEventListener("submit", changeUser);
