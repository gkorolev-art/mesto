//Создаем константу для кнопки редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");

//Создаем константу для попапа
const editPopup = document.querySelector(".popup");

//Создаём константу для кнопки закрытия попапа
const editProfileCloseButton = document.querySelector(".popup__close");

//Создаём константы для имени и профессии в блоке профиль
const userNameElement = document.querySelector(".profile__name");
const userOccupationElement = document.querySelector(".profile__occupation");

//Создаём константы для формы
const formEditProfile = document.querySelector(".popup__container");
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
