let currentScore = 0;
// let username ;
let difficulty = null;
let id = localStorage.getItem("userId")

// function saveUserData(name, score) {
//     localStorage.setItem("username", name);
//     localStorage.setItem("score", score);
// }

window.onload = function() {
    fetch(`https://68738976c75558e273547c3d.mockapi.io/users_info/${id}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            username = data.name;
            currentScore = parseInt(data.score) || 0;

            // saveUserData(username, currentScore);

            document.getElementById("userId").textContent = username;
            document.getElementById("score").textContent = currentScore;

        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Could not fetch user data.");

            
             username = localStorage.getItem("userId");
            currentScore = parseInt(localStorage.getItem("score")) || 0;
             document.getElementById("userId").textContent = username;
             document.getElementById("score").textContent = currentScore;
        });
};
    window.increaseScore = function(points) {
        currentScore += points;
        document.getElementById("score").textContent = currentScore;
        localStorage.setItem("score", currentScore);
    };


function startGame() {
     difficulty = document.getElementById("difficulty").value;
    alert("Starting game at " + difficulty + " level");

}

document.querySelector(".start-btn").addEventListener("click",
()=>{
    localStorage.setItem("difficulty", difficulty)
    // location.href = ""
}
)

function goToPage(page) {
    window.location.href = page;
}
