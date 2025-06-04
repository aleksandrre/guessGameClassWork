const gameContainer = document.querySelector(".gameContainer");

const boxContainer = document.createElement("div");
const guessedNumberP = document.createElement("p");

boxContainer.classList.add("boxContainer");

gameContainer.appendChild(boxContainer);
gameContainer.appendChild(guessedNumberP);

const allBoxes = [];
const allBoxValues = [];

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
const displayGuessedNumber = () => {
  guessedNumber = allBoxValues[Math.floor(Math.random() * allBoxValues.length)];
  guessedNumberP.textContent = guessedNumber;
};

const chooseOneBox = () => {
  allBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      box.querySelector(".boxValue").classList.add("revealed");
      if (
        parseInt(box.querySelector(".boxValue").textContent) === guessedNumber
      ) {
        message.textContent = "answer is right";
        resetGame();
      } else {
        message.textContent = "answer is false";
      }
    });
  });
};

const main = () => {
  createManyBox(3);
  displayGuessedNumber();
  chooseOneBox();
};

main();

const resetGame = () => {
  setTimeout(() => {
    allBoxes.length = 0;
    allBoxValues.length = 0;

    boxContainer.innerHTML = "";
    guessedNumberP.textContent = "";
    message.textContent = "";

    createManyBox(3);
    displayGuessedNumber();
    chooseOneBox();
  }, 2000);
};
