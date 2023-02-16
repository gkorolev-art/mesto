//Создаем константу для кнопки редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
if (!editProfileButton) {
  throw new Error("No editProfileButton");
}

//Создаем константу для попапа
const editPopup = document.querySelector(".popup");
if (!editPopup) {
  throw new Error("No editPopup");
}

//Создаём слушатель события на кнопку открытия попапа по клику
editProfileButton.addEventListener("click", function () {
  openPopup(editPopup);
});

//Создаём константу для кнопки закрытия попапа
const editProfileCloseButton = document.querySelector(".popup__close");
if (!editProfileCloseButton) {
  throw new Error("No closeEditProfileButton");
}

//Создаём слушатель события на кнопку закрытия попапа по клику
editProfileCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

//Создаем функцию, которая добавляет класс с правилом flex
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Создаем функцию, которая удаляет класс с правилом flex
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Хардкодим в переменные исходные данные пользователя из макета
let userName = "Жак-Ив Кусто";
let userOccupation = "Исследователь океана";

//Создаём константы для имени и профессии в блоке профиль
const userNameElement = document.querySelector(".profile__name");
userNameElement.textContent = userName;

const userOccupationElement = document.querySelector(".profile__occupation");
userOccupationElement.textContent = userOccupation;

//Создаём константы для формы
const formEditProfile = document.querySelector(".popup__container");
const userNameInput = document.querySelector("#user-name-input");
userNameInput.value = userName;
const userOccupationInput = document.querySelector("#user-occupation-input");
userOccupationInput.value = userOccupation;
const saveButton = document.querySelector(".popup__button-save");

//Создаём функцию сабмита формы редактирования профиля
function changeUser(evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
}

//Создаём слушатель события на отправку введённых данных
formEditProfile.addEventListener("submit", changeUser);

//Закрываем попап по клику "Сохранить" или нажатию Enter
saveButton.addEventListener("click", function () {
  closePopup(editPopup);
});
