let currentScore = 0;
let username = "sepideh";
let difficulty = null;
let id = localStorage.getItem("userId")



window.onload = async function() {
        try{
            const response = await fetch(`https://68738976c75558e273547c3d.mockapi.io/users_info/1`) 
            const data = await response.json();
            console.log(data);
            username = data.name;
            currentScore = parseInt(data.score) || 0;
            document.getElementById("userId").textContent = username;
            document.getElementById("score").textContent = currentScore;
        }
         catch(error) {
            console.error("Fetch error:", error);
            alert("Could not fetch user data.");

            
            currentScore = parseInt(localStorage.getItem("score")) || 0;
             document.getElementById("userId").textContent = username;
             document.getElementById("score").textContent = currentScore;
        };
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
