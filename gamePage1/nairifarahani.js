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
let levelColor = 0;
let colors = [];
let colorsmake = 6;

function guess(para) {
  let guss = [];
  for (const i of para) {
    let index = Math.floor(Math.random() * para.length);
    guss.push(para[index]);
  }
  return guss;
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

// هنگام کلیک بر روی دکمه "submit guess"
secondSectionbutton.addEventListener("click", () => {
  // بررسی اینکه آیا تعداد رنگ‌های انتخاب شده درست است یا نه
  if (secondSectionDiv2.children.length < colorsmake) {
    alert(`please select ${colorsmake} colors`);
    return;
  }

  // بازنشانی مقادیر برای هر حدس جدید
  correctPosition = 0;
  correctColor = 0;

  // ایجاد یک کپی برای عدم تغییر متغیر اصلی
  let gussCopy = [...guss];
  let userCopy = [...userguess];

  // چک دایره‌های کاملا درست (در جای درست)
  for (let i = 0; i < colorsmake; i++) {
    if (userCopy[i] === gussCopy[i]) {
      correctPosition++;
      gussCopy[i] = null; // حذف رنگ درست از کپی
      userCopy[i] = null; // حذف رنگ درست از حدس کاربر
    }
  }

  // چک دایره‌هایی که رنگ درست دارند اما در موقعیت اشتباه هستند
  for (let i = 0; i < userCopy.length; i++) {
    for (let j = 0; j < gussCopy.length; j++) {
      if (
        userCopy[i] !== null &&
        gussCopy[j] !== null &&
        userCopy[i] === gussCopy[j]
      ) {
        correctColor++;
        gussCopy[j] = null; // رنگ پیدا شده از کپی حذف می‌شود
        userCopy[i] = null; // رنگ پیدا شده از حدس کاربر حذف می‌شود
        break; // پس از یافتن یک رنگ درست در موقعیت اشتباه باید حلقه متوقف شود
      }
    }
  }

  console.log(
    `${correctPosition} color(s) in correct position\n${correctColor} correct color(s) but in wrong position`
  );

  // پس از هر حدس، لیست حدس‌های کاربر و رنگ‌های انتخابی باید پاک شوند
  secondSectionDiv2.innerHTML = "";
  userguess = [];
});

container.append(secondSection);
secondSection.append(secondSectionH2);
secondSection.append(secondSectionDiv0);
secondSectionDiv1.append(secondsectionp);
secondSection.append(secondSectionDiv1);
secondSection.append(secondSectionbutton);
secondSectionDiv1.append(secondSectionDiv2);
