// Variáveis
const popupEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupInputName = document.querySelector("#popup__input-name");
const popupInputAbout = document.querySelector("#popup__input-about");
const popupInputTitle = document.querySelector("#popup__input-title");
const popupInputLink = document.querySelector("#popup__input-link");
const userName = document.querySelector(".profile__user-name");
const userAbout = document.querySelector(".profile__user-about");
const popupSaveEditButton = document.querySelector("#popup__save-edit-button");
const popupSaveAddButton = document.querySelector("#popup__save-add-button");
const gridContainer = document.querySelector(".grid__card-container");
const popupImageImg = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const noCardsMessage = document.querySelector(".grid__without-cards-text");

// Funções para abrir e fechar popups
function openPopup(popup) {
  const form = popup.querySelector(".popup__form");

  // Resetar o formulário antes de abrir o popup
  resetForm(form);

  if (popup.classList.contains("popup_type_edit")) {
    popupInputName.value = userName.textContent;
    popupInputAbout.value = userAbout.textContent;

    // Ativar o botão de "Salvar" se os campos já estiverem preenchidos
    if (popupInputName.value && popupInputAbout.value) {
      popupSaveEditButton.classList.remove("popup__save-button_disabled");
      popupSaveEditButton.disabled = false;
    }
  }

  popup.classList.remove("popup_hidden");
}

function closePopup(popup) {
  popup.classList.add("popup_hidden");
}

popupEditButton.addEventListener("click", () => openPopup(popupEdit));
popupAddButton.addEventListener("click", () => openPopup(popupAdd));

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

// Função para salvar novos dados de nome e sobre
function saveNewInfo(evt) {
  evt.preventDefault();
  userName.textContent = popupInputName.value;
  userAbout.textContent = popupInputAbout.value;
  closePopup(popupEdit);
}

popupSaveEditButton.addEventListener("click", saveNewInfo);

// Subir com cards iniciais para a página
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

initialCards.forEach((card) => {
  const cardTemplate = document
    .querySelector("#grid__card")
    .content.cloneNode(true);
  const cardImage = cardTemplate.querySelector(".grid__img");
  const cardTitle = cardTemplate.querySelector(".grid__card-title");

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

  gridContainer.appendChild(cardTemplate);
});

// Adicionar novos cards
function addCards(evt) {
  evt.preventDefault();
  const cardTemplate = document
    .querySelector("#grid__card")
    .content.cloneNode(true);
  const cardImage = cardTemplate.querySelector(".grid__img");
  const cardTitle = cardTemplate.querySelector(".grid__card-title");

  cardImage.src = popupInputLink.value;
  cardImage.alt = `Imagem de ${popupInputTitle.value}`;
  cardTitle.textContent = popupInputTitle.value;

  gridContainer.prepend(cardTemplate);

  popupInputLink.value = "";
  popupInputTitle.value = "";

  toggleNoCardsMessage();
  closePopup(popupAdd);
}

popupSaveAddButton.addEventListener("click", addCards);

// Ativa a função para os botões like
gridContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("grid__like-icon")) {
    const likeIcon = evt.target;
    if (likeIcon.getAttribute("src") === "./images/like__icon.svg") {
      likeIcon.setAttribute("src", "./images/like__icon_active.svg");
    } else {
      likeIcon.setAttribute("src", "./images/like__icon.svg");
    }
  }
});

// Deleta card clicando no botão de lixeira
gridContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("grid__delete-icon")) {
    const cardToDelete = evt.target.closest(".grid__card");
    cardToDelete.remove();
    toggleNoCardsMessage();
  }
});

//Abrir e fechar popup da imagem

gridContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("grid__img")) {
    const cardImage = evt.target;
    const cardTitle = evt.target
      .closest(".grid__card")
      .querySelector(".grid__card-title");

    popupImage.classList.remove("popup_hidden");
    popupImageImg.src = cardImage.src;
    popupImageCaption.textContent = cardTitle.textContent;
  }
});

// Esconder mensagem de que não há cartões

function toggleNoCardsMessage() {
  if (gridContainer.children.length === 0) {
    noCardsMessage.classList.remove("grid__without-cards-text_hidden");
  } else {
    noCardsMessage.classList.add("grid__without-cards-text_hidden");
  }
}

toggleNoCardsMessage();
