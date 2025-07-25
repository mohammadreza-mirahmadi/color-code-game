const container = document.querySelector("#container");
// ======== definding the functions ========
let stop = null;
function timer(start, tag, colorCode) {
  if (stop) {
    return;
  }
  let nextTime = "";
  let sec1 = null;
  let sec2 = null;
  let min1 = null;
  let min2 = null;
  if (start.length === 5) {
    sec1 = Number(start[4]);
    sec2 = Number(start[3]);
    min1 = Number(start[1]);
    min2 = Number(start[0]);

    if (sec1 === 0) {
      sec1 = 9;
      if (sec2 === 0) {
        sec2 = 5;
        if (min1 === 0) {
          min1 = 9;
          if (min2 === 0) {
            // پس از هر حدس، لیست حدس‌های کاربر و رنگ‌های انتخابی باید پاک شوند
            secondSectionDiv2.innerHTML = "";
            userguess = [];
            showLost(colorCode);
            stop = "stop";
            secondSectionbutton.disabled = "true";
            secondSectionDiv2.style.visibility = "hidden";
            return;
          } else {
            min2 -= 1;
          }
        } else {
          min1 -= 1;
        }
      } else {
        sec2 -= 1;
      }
    } else {
      sec1 -= 1;
    }

    if (min2 === 0 && min1 === 0 && sec2 === 1 && sec1 === 0) {
      tag.style.color = "red";
    }

    nextTime = `${min2}${min1}:${sec2}${sec1}`;
  } else {
    sec1 = Number(start[3]);
    sec2 = Number(start[2]);
    min1 = Number(start[0]);

    if (sec1 === 0) {
      sec1 = 9;
      if (sec2 === 0) {
        sec2 = 5;
        if (min1 === 0) {
          // پس از هر حدس، لیست حدس‌های کاربر و رنگ‌های انتخابی باید پاک شوند
          secondSectionDiv2.innerHTML = "";
          userguess = [];
          showLost();
          stop = "stop";
          secondSectionbutton.disabled = "true";
          secondSectionDiv2.style.visibility = "hidden";
          return;
        } else {
          min1 -= 1;
        }
      } else {
        sec2 -= 1;
      }
    } else {
      sec1 -= 1;
    }

    if (min1 === 0 && sec2 === 1 && sec1 === 0) {
      tag.style.color = "red";
    }

    nextTime = `${min1}:${sec2}${sec1}`;
  }

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
    colorCircle.id = color.id;
    colorCircle.className = "";
    colorCircle.style.width = "1.5rem";
    colorCircle.style.height = "1.5rem";
    colorCircle.style.borderRadius = "50%";
    colorCircle.style.backgroundColor = color.color;
    userGuessParent.append(colorCircle);
  });
  yourGuessListItem.append(userGuessParent);

  const resultGuess = document.createElement("div");
  resultGuess.className = "";
  yourGuessListItem.append(resultGuess);

  const resultGuessText = document.createElement("p");
  resultGuessText.className = "";
  resultGuessText.textContent = `Correct: ${currectColors}, Misplaced: ${misplacedColors}`;
  resultGuess.append(resultGuessText);
}

async function showWin() {
  try {
    const winText = document.createElement("p");
    winText.textContent = "You won!";
    winText.className = "text-success";
    remainingGue.insertAdjacentElement("afterend", winText);

    const userId = localStorage.getItem("userId");
    const res = await axios.get(
      `https://68738976c75558e273547c3d.mockapi.io/users_info/${userId}`
    );
    const { data } = res;
    const level = localStorage.getItem("difficulty");
    if (level === "easy") {
      data.score += 5;
    } else if (level === "medium") {
      data.score += 10;
    } else {
      data.score += 20;
    }
    await axios.put(
      `https://68738976c75558e273547c3d.mockapi.io/users_info/${userId}`,
      data
    );

    setTimeout(() => {
      location.href = "../Home-page/Home.html";
    }, 5000);
  } catch (err) {
    console.error(err);
  }
}

function showLost(colorCode) {
  const lossText = document.createElement("p");
  lossText.textContent = "You lost!";
  lossText.className = "text-danger";
  remainingGue.insertAdjacentElement("afterend", lossText);

  const lostSection = document.createElement("section");
  lostSection.id = "lostSection";
  lostSection.className =
    "px-3 py-3 mt-3 rounded border border-2 d-flex align-items-center justify-content-between";
  lostSection.style.backgroundColor = "#f0f0f0";
  yourGuessSection.insertAdjacentElement("beforebegin", lostSection);

  const lostSectionText = document.createElement("p");
  lostSectionText.textContent = "The Color Code:";
  lostSectionText.className = "";
  lostSectionText.style.margin = "0";
  lostSection.append(lostSectionText);

  const lostSectionColorCode = document.createElement("div");
  lostSectionColorCode.className =
    "d-flex align-items-center justify-content-between";

  lostSection.append(lostSectionColorCode);

  colorCode.forEach((color) => {
    const colorCodeCircle = document.createElement("div");
    colorCodeCircle.className = "rounded-circle me-2";
    colorCodeCircle.style.width = "1.5rem";
    colorCodeCircle.style.height = "1.5rem";
    colorCodeCircle.style.backgroundColor = color;
    lostSectionColorCode.append(colorCodeCircle);

    setTimeout(() => {
      location.href = "../Home-page/Home.html";
    }, 5000);
  });
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
timeLeftSpan.textContent = "";
timeLeft.append(timeLeftSpan);

nav.append(remainingGue, timeLeft);
container.append(firstSection);

// ======== The second section ========
const secondSection = document.createElement("section");
secondSection.id = "second-section";
secondSection.className = "mt-3";

const secondSectionH2 = document.createElement("h2");
secondSectionH2.id = "second-section-h2";
secondSectionH2.className = "text-center h3 fs-5";
secondSectionH2.textContent = "Select colors";

const secondSectionDiv0 = document.createElement("div");
secondSectionDiv0.id = "second-secion-div0";
secondSectionDiv0.className = "d-flex gap-1 mb-3";

const secondSectionDiv1 = document.createElement("div");
secondSectionDiv1.id = "second-Section_div1";
secondSectionDiv1.className = "d-flex gap-2 ";

const secondSectionDiv2 = document.createElement("div");
secondSectionDiv2.id = "second-section-div2";
secondSectionDiv2.className = "d-flex gap-2 pt-2";

const secondsectionp = document.createElement("p");
secondsectionp.id = "second-section-p";
secondsectionp.textContent = "your current guess:";

const secondSectionbutton = document.createElement("button");
secondSectionbutton.id = "second-section-button";
secondSectionbutton.textContent = "submit guess";
secondSectionbutton.className = "btn btn-success btn-sm";

let correctColor = 0;
let correctPosition = 0;
let levelColor = localStorage.getItem("difficulty");
let colors = [];
let colorsmake = 6;
let timeValue = null;

function guess(para) {
  let guss = [];
  for (const i of para) {
    let index = Math.floor(Math.random() * para.length);
    guss.push(para[index]);
  }
  return guss;
}

if (levelColor === "easy") {
  colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  colorsmake = 6;
  timeValue = "5:00";
} else if (levelColor === "medium") {
  colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "lightgreen",
    "black",
  ];
  colorsmake = 8;
  timeValue = "10:00";
} else if (levelColor === "hard") {
  colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "lightgreen",
    "black",
    "pink",
    "brown",
  ];
  colorsmake = 10;
  timeValue = "15:00";
}
let guss = guess(colors);
let userguess = [];
let circleId = 0;
colors.forEach((para) => {
  // دایره های اصلی برای حدس کاربر
  const circlebColors = document.createElement("div");
  circlebColors.id = para;
  circlebColors.className = "rounded-circle";
  circlebColors.style.width = "30px";
  circlebColors.style.height = "30px";
  circlebColors.style.background = para;
  //  حدس کد توسط کاربر

  circlebColors.addEventListener("click", () => {
    if (secondSectionDiv2.children.length === colorsmake) {
      return;
    }
    const circleColors = document.createElement("div");
    circleColors.className = "rounded-circle";
    circleColors.id = circleId;
    circleColors.style.width = "15px";
    circleColors.style.height = "15px";
    circleColors.style.background = para;
    circleColors.addEventListener("click", (e) => {
      const id = e.target.id;
      const targetIndex = userguess.findIndex((item) => item.id === id);
      userguess.splice(targetIndex, 1);
      e.target.remove();
    });
    secondSectionDiv2.append(circleColors);
    userguess.push({ id: circleId, color: para });
    circleId++;
  });

  secondSectionDiv0.append(circlebColors);
});

// هنگام کلیک بر روی دکمه "submit guess"
secondSectionbutton.addEventListener("click", (e) => {
  // بررسی اینکه آیا تعداد رنگ‌های انتخاب شده درست است یا نه
  if (secondSectionDiv2.children.length < colorsmake) {
    alert(`please select ${colorsmake} colors`);
    return;
  }

  // بازنشانی مقادیر برای هر حدس جدید
  correctPosition = 0;
  correctColor = 0;
  circleId = 0;

  // ایجاد یک کپی برای عدم تغییر متغیر اصلی
  const userGuessColor = [];
  userguess.forEach((color) => {
    userGuessColor.push(color.color);
  });
  let gussCopy = [...guss];
  let userCopy = [...userGuessColor];

  // چک دایره‌های کاملا درست (در جای درست)
  for (let i = 0; i < colorsmake; i++) {
    if (userCopy[i] === gussCopy[i]) {
      correctPosition++;
      gussCopy.splice(i, 1, "currect"); // حذف رنگ درست از کپی
      userCopy.splice(i, 1, "currect"); // حذف رنگ درست از حدس کاربر
    }
  }

  // چک دایره‌هایی که رنگ درست دارند اما در موقعیت اشتباه هستند
  for (let i = 0; i < userCopy.length; i++) {
    for (let j = 0; j < gussCopy.length; j++) {
      if (gussCopy[j] !== "currect" && userCopy[i] === gussCopy[j]) {
        correctColor++;
        userCopy.splice(i, 1, "checked"); // رنگ پیدا شده از کپی حذف می‌شود

        break; // پس از یافتن یک رنگ درست در موقعیت اشتباه باید حلقه متوقف شود
      }
    }
  }

  remainingGueSpan.textContent = Number(remainingGueSpan.textContent) - 1;
  userGuessRender(userguess, correctPosition, correctColor);

  // هندل کردن برد و باخت

  if (userguess.length === correctPosition) {
    showWin();
    stop = "stop";
    e.currentTarget.disabled = "true";

    // پس از هر حدس، لیست حدس‌های کاربر و رنگ‌های انتخابی باید پاک شوند
    secondSectionDiv2.innerHTML = "";
    userguess = [];

    return;
  }

  // پس از هر حدس، لیست حدس‌های کاربر و رنگ‌های انتخابی باید پاک شوند
  secondSectionDiv2.innerHTML = "";
  userguess = [];

  if (remainingGueSpan.textContent === "0") {
    showLost(guss);
    stop = "stop";
    e.currentTarget.disabled = "true";
    secondSectionDiv2.style.visibility = "hidden";
    // secondSectionDiv0.children.forEach((item) => {
    //   item.removeEventListener("click", currentUserGuess);
    // });
    return;
  }
});

container.append(secondSection);
secondSection.append(secondSectionH2);
secondSection.append(secondSectionDiv0);
secondSectionDiv1.append(secondsectionp);
secondSection.append(secondSectionDiv1);
secondSection.append(secondSectionbutton);
secondSectionDiv1.append(secondSectionDiv2);

// ======== The third section ========
const yourGuessSection = document.createElement("section");
yourGuessSection.id = "yourGuessSection";

const yourGuessTitle = document.createElement("h2");
yourGuessTitle.id = "yourGuessTitle";
yourGuessTitle.className = "text-center h3 fs-5 mt-3";
yourGuessTitle.textContent = "Your Guesses";
yourGuessSection.append(yourGuessTitle);

const yourGuessList = document.createElement("ul");
yourGuessList.id = "yourGuessList";
yourGuessList.className = "px-3 pb-3 mt-3 rounded border border-2";
yourGuessList.style.listStyle = "none";
yourGuessList.style.backgroundColor = "#f0f0f0";
yourGuessSection.append(yourGuessList);

container.append(yourGuessSection);

timer(timeValue, timeLeftSpan, guss);
