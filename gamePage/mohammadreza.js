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

// ======== creating the elements ========

const firstSection = document.createElement("section");
firstSection.id = "first-section";

const title = document.createElement("h1");
title.id = "title";
title.textContent = "Color Code Game";
title.className = "text-center h3 mb-3";

const nav = document.createElement("div");
nav.id = "nav";
nav.style.backgroundColor = "#f0f0f0";
nav.className =
  "rounded border border-2 py-2 px-3 d-flex justify-content-between";

const remainingGue = document.createElement("p");
remainingGue.id = "remainingGue";
remainingGue.className = "m-0 fw-bold";
remainingGue.textContent = "Remaining Guesses: ";

const remainingGueSpan = document.createElement("span");
remainingGueSpan.id = "remainingGueSpan";
remainingGueSpan.className = "fw-normal";
remainingGueSpan.textContent = "10";

const timeLeft = document.createElement("p");
timeLeft.id = "timeLeft";
timeLeft.className = "m-0 fw-bold";
timeLeft.textContent = "Time Left: ";

const timeLeftSpan = document.createElement("span");
timeLeftSpan.id = "timeLeftSpan";
timeLeftSpan.className = "fw-normal";
timeLeftSpan.textContent = "5:00";

// ======== appending the elements ========

timeLeft.append(timeLeftSpan);
remainingGue.append(remainingGueSpan);

nav.append(remainingGue, timeLeft);

firstSection.append(title);

container.append(firstSection, nav);

// document.addEventListener("DOMContentLoaded", () => {
//   timer("0:13", timeLeftSpan);
// });
timer("0:13", timeLeftSpan);
