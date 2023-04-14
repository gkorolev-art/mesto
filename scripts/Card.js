class Card {
  constructor(data, templateSelector, handleFullsizePicture) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleFullsizePicture = handleFullsizePicture;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._nameNewCard = this._cardElement.querySelector(".item__heading");
    this._pictureNewCard = this._cardElement.querySelector(".item__picture");
    this._deleteCardButton = this._cardElement.querySelector(".item__trash");
    this._likeCardButton = this._cardElement.querySelector(".item__like");

    this._nameNewCard.textContent = this._name;
    this._pictureNewCard.src = this._link;
    this._pictureNewCard.alt = `Фото ${this._name}`;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleLikeCard() {
    this._likeCardButton.classList.toggle("item__like_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._nameNewCard = null;
    this._pictureNewCard = null;
    this._likeCardButton = null;
    this._deleteCardButton = null;
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeCardButton.addEventListener("click", () =>
      this._handleLikeCard()
    );
    this._deleteCardButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._pictureNewCard.addEventListener("click", () =>
      this._handleFullsizePicture({ link: this._link, name: this._name })
    );
  }
}
export { Card };
