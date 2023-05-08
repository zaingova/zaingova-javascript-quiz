// global element variables
var startEl = document.querySelector(".start");
var headerEl = document.querySelector("header")
var bodyEl = document.querySelector(".game");
var timerEl = document.querySelector(".timer");
var dataEl = document.querySelector(".stats")

// global game variables
var timeRemaining;
var finishedQuiz;

var playerData = [];

// event listener to clear the header content whem the 'start' button is clicked
startEl.addEventListener("click", function () {
    startQuiz();
})

// initializer function. sets game state, etc
function init() {
    timeRemaining = 5;
    finishedQuiz = false;
}

// starts the quiz
function startQuiz() {
    // hides the header
    headerEl.style.display = "none";

    startTimer();
}

// logs score in local storage
function logScore() {
    dataEl.textContent = playerData[0] + " -- " + playerData[1];
    localStorage.setItem("data", playerData);
}

// ends the quiz and displays highscores
function endQuiz() {
    bodyEl.setAttribute("style", "text-align: center; font-size: 50px; padding-top: 50px");
    bodyEl.textContent = "Thanks for playing!";
}

// starts the timer count down
function startTimer() {
    timerEl.textContent = "Time remaining: " + timeRemaining + " seconds";
    var timer = setInterval(function () {
        timeRemaining--;
        timerEl.textContent = "Time remaining: " + timeRemaining + " seconds";
        if (timeRemaining >= 0) {
            if (finishedQuiz && timerCount > 0) {
                clearInterval(timer);
                endQuiz();
            }
        }
        if (timeRemaining === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

init();