// Verificar se há cartões sempre que carregar a página

document.addEventListener("DOMContentLoaded", function () {
  cardVisibility();
});

// Abrir e fechar popup de Edição e Adição no Profile

const openEditButton = document.querySelector(".profile__edit-button");
const closeEditButton = document.querySelector(
  ".profile__edit-popup-close-button"
);
const profileEditPopup = document.querySelector(".profile__edit-popup");

const openAddButton = document.querySelector(".profile__add-button");
const closeAddButton = document.querySelector(
  ".profile__add-popup-close-button"
);
const profileAddPopup = document.querySelector(".profile__add-popup");

const userName = document.querySelector(".profile__user-name");
const userAbout = document.querySelector(".profile__user-about");

const inputName = document.querySelector("#profile__edit-popup-input-name");
const inputAbout = document.querySelector("#profile__edit-popup-input-about");

function openPopup(popup) {
  popup.classList.remove(
    "profile__edit-popup_hidden",
    "profile__add-popup_hidden"
  );

  if (popup === profileEditPopup) {
    inputName.value = userName.textContent;
    inputAbout.value = userAbout.textContent;
  }
}

function closePopup(popup) {
  popup.classList.add(
    "profile__edit-popup_hidden",
    "profile__add-popup_hidden"
  );
}

openEditButton.addEventListener("click", () => openPopup(profileEditPopup));
closeEditButton.addEventListener("click", () => closePopup(profileEditPopup));

openAddButton.addEventListener("click", () => openPopup(profileAddPopup));
closeAddButton.addEventListener("click", () => closePopup(profileAddPopup));

// Função para atualizar o Nome e a Ocupação do usuário após salvar a edição

const formElement = document.querySelector(".profile__edit-popup-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#profile__edit-popup-input-name");
  const jobInput = document.querySelector("#profile__edit-popup-input-about");

  const newName = nameInput.value;
  const newJob = jobInput.value;

  const displayName = document.querySelector(".profile__user-name");
  const displayJob = document.querySelector(".profile__user-about");

  displayName.textContent = newName;
  displayJob.textContent = newJob;

  closePopup(profileEditPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// Função para deixar os cards dinâmicos com JavaScript usanto tag <template>

const cardsTemplate = document.querySelector("#grid__card").content;
const cardsContainer = document.querySelector(".grid__card-container");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    alt: "Imagem do Parque Nacional de Yosemite, Califórnia, com suas majestosas montanhas e paisagens naturais deslumbrantes.",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    alt: "Imagem do Lago sereno com montanhas majestosas ao fundo, refletindo a beleza natural da paisagem.",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    alt: "Imagem de um pôr do sol sobre montanhas.",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    alt: "Imagem de uma cadeia de montanhas sob um céu estrelado, destacando a beleza da natureza à noite.",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    alt: "Imagem de um lago de montanha refletindo as montanhas ao fundo, criando uma cena serena e natural.",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    alt: "Imagem de barcos atracados em um cais, com montanhas majestosas ao fundo, criando uma paisagem serena e natural.",
  },
];

function createCard(cardData) {
  const cardElement = cardsTemplate
    .querySelector(".grid__card")
    .cloneNode(true);
  cardElement.querySelector(".grid__img").src = cardData.link;
  cardElement.querySelector(".grid__img").alt = cardData.alt;
  cardElement.querySelector(".grid__card-title").textContent = cardData.name;
  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.appendChild(cardElement);
});

// Função para adicionar um cartão

// Função para deletar Card quando clica no botão Deletar

cardsContainer.addEventListener("click", function (evt) {
  if (evt.target.closest(".grid__card-delete-button")) {
    const cardElement = evt.target.closest(".grid__card");
    if (cardElement) {
      cardElement.remove();
      cardVisibility();
    }
  }
});

// Função para mostrar a mensagem "Ainda não há cartões" quando o grid de cartões está vazio

function cardVisibility() {
  const cards = document.querySelectorAll(".grid__card-container .grid__card");
  const noCardsMessage = document.querySelector(".grid__without-cards");

  if (cards.length === 0) {
    noCardsMessage.classList.remove("grid__without-cards");
  } else {
    noCardsMessage.classList.add("hidden");
  }
}

cardVisibility();

// Função para alternar o ícone de "Curtir" ao clicar no botão de curtir

const likeButtons = document.querySelectorAll(".grid__like-icon");

function toggleLike(click) {
  const likeIcon = click.target;
  if (likeIcon.getAttribute("src") === "./images/like__icon.svg") {
    likeIcon.setAttribute("src", "./images/like__icon_active.svg");
  } else {
    likeIcon.setAttribute("src", "./images/like__icon.svg");
  }
}

likeButtons.forEach((button) => {
  button.addEventListener("click", toggleLike);
});
