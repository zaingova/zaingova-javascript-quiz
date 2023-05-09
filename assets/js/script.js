// global element variables
var introEl = document.querySelector(".intro-page");
var timerEl = document.querySelector(".timer");
var mainEl = document.querySelector(".main");
var quizQuestion = document.querySelector(".question")
var quizAnswers = document.querySelector(".answers");

var title = document.createElement("h1");
var description = document.createElement("h4")
var startButton = document.createElement("button");

// creating elements that will be the possible answers when displayed on the screen
var a1 = document.createElement("p");
var a2 = document.createElement("p");
var a3 = document.createElement("p");
var a4 = document.createElement("p");

// global game variables
var timeRemaining;
var finishedQuiz;
var score;

// array of objects, containing the question, the possible answers, and the correct answer
var answers = [
    {
        "question": "#1. What does CSS stand for?",
        "options": ["Cascading Style Sheets", "Computational Software System", "Call Set Style", "Correspondance Solutions Systems"],
        "answer": "Cascading Style Sheets"
    },
    {
        "question": "#2. What is 10 + 10?",
        "options": [5, 3, 7, 20],
        "answer": 20
    },
    {
        "question": "#3. What is 10 + 10?",
        "options": [5, 3, 7, 20],
        "answer": 20
    },
    {
        "question": "#4. What is 10 + 10?",
        "options": [5, 3, 7, 20],
        "answer": 20
    },
    {
        "question": "#5. sWhat is 10 + 10?",
        "options": [5, 3, 7, 20],
        "answer": 20
    }
]

var playerData = [];

// function that displays the introduction screen
function displayIntro() {
    title.textContent = "JavaScript Quiz";
    description.textContent = "This is a JavaScript quiz coded using the JavaScript Browser API!\nClick on the start button to begin!"
    startButton.textContent = "START";

    introEl.appendChild(title);
    introEl.appendChild(description);
    introEl.appendChild(startButton);
}

function displayQuiz() {
    startTimer();
    displayQuestion(0);
}

function displayQuestion(qindex) {
    // sets the question value
    quizQuestion.textContent = answers[0].question;

    // sets the
    a1.textContent = "a) " + answers[qindex].options[0];
    quizAnswers.appendChild(a1);
    a2.textContent = "b) " + answers[qindex].options[1];
    quizAnswers.appendChild(a2);
    a3.textContent = "c) " + answers[qindex].options[2];
    quizAnswers.appendChild(a3);
    a4.textContent = "d) " + answers[qindex].options[3];
    quizAnswers.appendChild(a4);
}

// event listener to clear the header content whem the 'start' button is clicked
startButton.addEventListener("click", function () {
    introEl.textContent = " ";
    quizQuestion.setAttribute("style", "display: block");
    init();
})

// initializer function. sets game state, starts timer, etc
function init() {
    score = 0;
    timeRemaining = 60;
    finishedQuiz = false;
    displayQuiz();
}

function renderHighscored() {

}

// logs score in local storage
function logScore() {
    var newUser = document.createElement("li")

    playerData[1] = 10;
    mainEl.appendChild(newUser);
    localStorage.setItem(playerData[0], JSON.stringify(playerData));
}

// ends the quiz and displays highscores
function endQuiz() {

}

// starts the timer count down
function startTimer() {
    timerEl.textContent = "Time remaining: " + timeRemaining + " seconds";
    var timer = setInterval(function () {
        timeRemaining--;
        timerEl.textContent = "Time remaining: " + timeRemaining + " seconds";
        // if there is time left over and the user finishes the quiz
        if (finishedQuiz && timeRemaining > 0) {
            clearInterval(timer);
            endQuiz();
        }

        if (timeRemaining === 0) {
            mainEl.textContent = " ";
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

displayIntro();