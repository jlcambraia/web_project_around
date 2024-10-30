let openEditButton = document.querySelector(".profile__edit-button");
let profilePopup = document.querySelector(".profile__edit-popup");
let closeEditButton = document.querySelector(
  ".profile__edit-popup-close-button"
);
let userName = document.querySelector(".profile__user-name");
let userAbout = document.querySelector(".profile__user-about");

let inputName = document.querySelector("#profile__edit-popup-input-name");
let inputAbout = document.querySelector("#profile__edit-popup-input-about");

function openPopup() {
  profilePopup.classList.remove("profile__edit-popup_hidden");
  inputName.value = userName.textContent;
  inputAbout.value = userAbout.textContent;
}

function closePopup() {
  profilePopup.classList.add("profile__edit-popup_hidden");
}

openEditButton.addEventListener("click", openPopup);

closeEditButton.addEventListener("click", closePopup);

let likeButtons = document.querySelectorAll(".grid__like-icon");

function toggleLike(click) {
  let likeIcon = click.target;
  if (likeIcon.getAttribute("src") === "./images/like__icon.svg") {
    likeIcon.setAttribute("src", "./images/like__icon_active.svg");
    likeIcon.classList.add("active", "no-hover");
  } else {
    likeIcon.setAttribute("src", "./images/like__icon.svg");
    likeIcon.classList.remove("active", "no-hover");
  }
}

likeButtons.forEach((button) => {
  button.addEventListener("click", toggleLike);
});

let formElement = document.querySelector(".profile__edit-popup-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#profile__edit-popup-input-name");
  let jobInput = document.querySelector("#profile__edit-popup-input-about");

  let newName = nameInput.value;
  let newJob = jobInput.value;

  let displayName = document.querySelector(".profile__user-name");
  let displayJob = document.querySelector(".profile__user-about");

  displayName.textContent = newName;
  displayJob.textContent = newJob;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

function cardVisibility() {
  let cards = document.querySelectorAll(".grid__card");
  let noCardsMessage = document.querySelector(".grid__without-cards");

  if (cards.length === 0) {
    noCardsMessage.classList.remove("grid__without-cards");
  } else {
    noCardsMessage.classList.add("hidden");
  }
}

cardVisibility();
