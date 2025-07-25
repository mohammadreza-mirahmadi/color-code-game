let currentScore = null;
let username = null;
let difficulty = null;
let id = localStorage.getItem("userId");

window.onload = async function () {
  try {
    const response = await fetch(
      `https://68738976c75558e273547c3d.mockapi.io/users_info/${id}`
    );
    const data = await response.json();
    username = data.name;
    currentScore = data.score;
    document.getElementById("userId").textContent = username;
    document.getElementById("score").textContent = currentScore;
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not fetch user data.");

    document.getElementById("userId").textContent = username;
    document.getElementById("score").textContent = currentScore;
  }
};
window.increaseScore = function (points) {
  currentScore += points;
  document.getElementById("score").textContent = currentScore;
  localStorage.setItem("score", currentScore);
};

document.querySelector(".start-btn").addEventListener("click", () => {
  difficulty = document.getElementById("difficulty").value;
  localStorage.setItem("difficulty", difficulty);
  location.href = "../gamePage1/game.html";
});

function goToPage(page) {
  window.location.href = page;
}
