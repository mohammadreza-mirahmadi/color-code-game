const container = document.getElementById("container");

const secondSection = document.createElement("section");
secondSection.id = "second-section";
secondSection.className = "";

const secondSectionH2 = document.createElement("h2");
secondSectionH2.id = "second-section-h2";
secondSectionH2.className = "text-center h5";
secondSectionH2.textContent = "select colors";

const secondSectionDiv0 = document.createElement("div");
secondSectionDiv0.id = "second-secion-div0";
secondSectionDiv0.className = "d-flex gap-1 mb-3";

const secondSectionDiv1 = document.createElement("div");
secondSectionDiv1.id = "second-Section_div1";
secondSectionDiv1.className = "d-flex gap-2 ";
// align-items-center
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

let levelColor = 0;
let colors = [];
let colorsmake = 6;

function guess(para) {
  let gu = [];
  for (const i of para) {
    let index = Math.floor(Math.random() * para.length);
    gu.push(para[index]);
  }
  return gu;
}

if (levelColor === 0) {
  colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  colorsmake = 6;
} else if (levelColor === 1) {
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
} else if (levelColor === 2) {
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
}
let guss = guess(colors);
let userguess = [];
console.log(guss);
colors.forEach((para) => {
  // دایره های اصلی برای حدس کاربر
  const circlebColors = document.createElement("div");
  circlebColors.id = para;
  circlebColors.className = "rounded-circle";
  circlebColors.style.width = "30px";
  circlebColors.style.height = "30px";
  circlebColors.style.background = para;
  console.log(circlebColors);
  //  حدس کد توسط کاربر
  circlebColors.addEventListener("click", () => {
    if (secondSectionDiv2.children.length === colorsmake) {
      return;
    }
    const circleColors = document.createElement("div");
    circleColors.className = "rounded-circle";
    circleColors.style.width = "15px";
    circleColors.style.height = "15px";
    circleColors.style.background = para;
    circleColors.addEventListener("click", (e) => {
      e.target.remove();
    });
    secondSectionDiv2.append(circleColors);
    userguess.push(para);
  });
  secondSectionDiv0.append(circlebColors);
});

let correctPosition = 0;
let correctColor = 0;

console.log(userguess);
secondSectionbutton.addEventListener("click", () => {
  if (secondSectionDiv2.children.length < colorsmake) {
    alert(`please select ${colorsmake} colors `);
    return;
  }
  // ایجاد یک کپی برای عدم تغییر متغیر اصلی
  let gussCopy = [...guss];
  let userCopy = [...userguess];
  // چک دایره های کاملا درست
  for (let i = 0; i < colorsmake; i++) {
    if (userCopy[i] === gussCopy[i]) {
      correctPosition++;

      gussCopy[i] = null;
      userCopy[i] = null;
    }
  }
  // چک دایره هایی با رنگ درست ولی در جای اشتباه
  // for (let i = 0; i < colorsmake; i++) {
  //   if (userCopy[i] !== null) {
  //     let index = gussCopy.indexOf(userCopy[i]);
  //     if (index !== -1) {
  //       correctColor++;
  //       gussCopy.splice(index, 1, null);
  //     }
  //   }
  // }

  for (let i = 0; i < userCopy.length; i++) {
    for (let j = 0; j < gussCopy.length; j++) {
      if (gussCopy[j] === gussCopy[i] && gussCopy[j] !== null) {
        correctColor++;
        gussCopy.splice(j, 1, null);
        // break;
      }
    }
  }

  console.log(
    ` ${correctPosition} color(s) in correct position\n ${correctColor} correct color(s) but in wrong position`
  );

  secondSectionDiv2.innerHTML = "";
  userguess = [];
  console.log(gussCopy);
  console.log(userCopy);
});

container.append(secondSection);
secondSection.append(secondSectionH2);
secondSection.append(secondSectionDiv0);
secondSectionDiv1.append(secondsectionp);
secondSection.append(secondSectionDiv1);
secondSection.append(secondSectionbutton);
secondSectionDiv1.append(secondSectionDiv2);
