const gameContainer = document.querySelector(".gameContainer");
const boxContainer = document.createElement("div");
const guessedNumberP = document.createElement("p");
boxContainer.classList.add("boxContainer");

gameContainer.appendChild(boxContainer);
gameContainer.appendChild(guessedNumberP);
let allBoxes = [];
let allBoxValues = [];
let userChance = 3;

const createBox = () => {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 10) + 1;
  } while (allBoxValues.includes(randomNumber));

  const box = document.createElement("div");
  const boxValue = document.createElement("p");

  allBoxValues.push(randomNumber);
  boxValue.textContent = randomNumber;

  boxValue.classList.add("boxValue");
  box.classList.add("box");

  box.appendChild(boxValue);
  boxContainer.appendChild(box);
  allBoxes.push(box);
};

const createManyBox = (boxQuantity) => {
  for (let i = 0; i < boxQuantity; i++) {
    createBox();
  }
};

const message = document.getElementById("message");
let guessedNumber;

const displayGussedNumber = () => {
  guessedNumber = allBoxValues[Math.floor(Math.random() * allBoxValues.length)];
  guessedNumberP.textContent = guessedNumber;
};

let isResetting = false;

const chooseOneBox = () => {
  allBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (isResetting) return;
      box.querySelector(".boxValue").classList.add("revealed");
      if (box.querySelector(".boxValue").textContent == guessedNumber) {
        message.textContent = "answer is right";
        isResetting = true;
        resetGame();
      } else {
        userChance--;
        if (userChance <= 0) {
          message.textContent = "no more chance you defeated";
          isResetting = true;
          resetGame();
        } else {
          message.textContent = "answer is false";
        }
      }
    });
  });
};

const main = () => {
  createManyBox(5);
  displayGussedNumber();
  chooseOneBox();
};

main();

const resetGame = () => {
  setTimeout(() => {
    allBoxValues = [];
    allBoxes = [];

    boxContainer.innerHTML = "";
    message.textContent = "";
    guessedNumberP.textContent = "";
    userChance = 3;
    isResetting = false;
    main();
  }, 2000);
};
