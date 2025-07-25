const container = document.querySelector("#container");

// ======== definding the functions ========

function timer(start, tag) {
  let nextTime = "";
  let sec1 = Number(start[3]);
  let sec2 = Number(start[2]);
  let min = Number(start[0]);

  if (sec1 === 0) {
    sec1 = 9;
    if (sec2 === 0) {
      sec2 = 5;
      if (min === 0) {
        return;
      } else {
        min -= 1;
      }
    } else {
      sec2 -= 1;
    }
  } else {
    sec1 -= 1;
  }

  if ((min === 0 && sec2 === 1, sec1 === 0)) {
    tag.style.color = "red";
  }

  nextTime = `${min}:${sec2}${sec1}`;

  tag.textContent = nextTime;

  setTimeout(() => {
    timer(nextTime, tag);
  }, 1000);
}

function userGuessRender(userGuess, currectColors, misplacedColors) {
  const yourGuessListItem = document.createElement("li");
  yourGuessListItem.className =
    "d-flex justify-content-between border-top border-2 pt-3";
  yourGuessListItem.style.marginTop = "-1.5px";
  yourGuessList.insertAdjacentElement("afterbegin", yourGuessListItem);

  const userGuessParent = document.createElement("div");
  userGuessParent.id = "userGuessParent";
  userGuessParent.className = "d-flex gap-3";
  yourGuessList.append(userGuessParent);

  userGuess.forEach((color) => {
    const colorCircle = document.createElement("div");
    colorCircle.id = "colorCircle";
    colorCircle.className = "";
    colorCircle.style.width = "1.5rem";
    colorCircle.style.height = "1.5rem";
    colorCircle.style.borderRadius = "50%";
    colorCircle.style.backgroundColor = color;
    userGuessParent.append(colorCircle);
  });
  yourGuessListItem.append(userGuessParent);

  const resultGuess = document.createElement("div");
  resultGuess.className = "";
  yourGuessListItem.append(resultGuess);

  const resultGuessText = document.createElement("p");
  resultGuessText.className = "";
  resultGuessText.textContent = `Currect: ${currectColors}, Misplaced: ${misplacedColors}`;
  resultGuess.append(resultGuessText);
}

// ======== The firs section ========

const firstSection = document.createElement("section");
firstSection.id = "first-section";

const mainTitle = document.createElement("h1");
mainTitle.id = "title";
mainTitle.textContent = "Color Code Game";
mainTitle.className = "text-center h3 mb-3";
firstSection.append(mainTitle);

const nav = document.createElement("div");
nav.id = "nav";
nav.style.backgroundColor = "#f0f0f0";
nav.className =
  "rounded border border-2 py-2 px-3 d-flex justify-content-between";
firstSection.append(nav);

const remainingGue = document.createElement("p");
remainingGue.id = "remainingGue";
remainingGue.className = "m-0 fw-bold";
remainingGue.textContent = "Remaining Guesses: ";

const remainingGueSpan = document.createElement("span");
remainingGueSpan.id = "remainingGueSpan";
remainingGueSpan.className = "fw-normal";
remainingGueSpan.textContent = "10";
remainingGue.append(remainingGueSpan);

const timeLeft = document.createElement("p");
timeLeft.id = "timeLeft";
timeLeft.className = "m-0 fw-bold";
timeLeft.textContent = "Time Left: ";

const timeLeftSpan = document.createElement("span");
timeLeftSpan.id = "timeLeftSpan";
timeLeftSpan.className = "fw-normal";
timeLeftSpan.textContent = "5:00";
timeLeft.append(timeLeftSpan);

nav.append(remainingGue, timeLeft);

// ======== The third section ========
const yourGuessSection = document.createElement("section");
yourGuessSection.id = "yourGuessSection";

const yourGuessTitle = document.createElement("h2");
yourGuessTitle.id = "yourGuessTitle";
yourGuessTitle.className = "text-center h3 fs-5 mt-2";
yourGuessTitle.textContent = "Your Guesses";
yourGuessSection.append(yourGuessTitle);

const yourGuessList = document.createElement("ul");
yourGuessList.id = "yourGuessList";
yourGuessList.className = "px-3 pb-3 mt-3 rounded border border-2";
yourGuessList.style.listStyle = "none";
yourGuessList.style.backgroundColor = "#f0f0f0";
yourGuessSection.append(yourGuessList);

container.append(firstSection);
container.append(yourGuessSection);

timer("5:00", timeLeftSpan);
