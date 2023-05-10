// global element variables
var introEl = document.querySelector(".intro-page");
var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".score");
var mainEl = document.querySelector(".main");
var quizQuestionEl = document.querySelector(".question")
var quizAnswersEl = document.querySelector(".answers");
var userStatsEl = document.querySelector(".stats");

var title = document.createElement("h1");
var description = document.createElement("h4")
var startButton = document.createElement("button");
var replayButton = document.createElement("button");

// creating elements that will be the possible answers when displayed on the screen
var a1 = document.createElement("p");
var a2 = document.createElement("p");
var a3 = document.createElement("p");
var a4 = document.createElement("p");

// adds class names to either button so they can be styled differently
startButton.className = "start-button";
replayButton.className = "replay-button";

// global game variables
var timeRemaining;
var score;
var finishedQuiz;

// global var that helps iterate through question numbers
var questionNum;

// players initial and score get stored here
var playerData = [];

// array of objects, containing the question, the possible answers, and the correct answer
var answers = [
    {
        "question": "What does CSS stand for?",
        "options": ["Cascading Style Sheets", "Computational Software System", "Call Set Style", "Correspondance Solutions Systems"],
        "answer": "Cascading Style Sheets"
    },
    {
        "question": "What does CSS allow us to do?",
        "options": ["Style the HTML elements", "Add interactivity to the webpage", "Use various 3rd-party APIs", "Sort items in a list"],
        "answer": "Style the HTML elements"
    },
    {
        "question": "What does API stand for?",
        "options": ["Application Programming Interface", "Artificial Part Interaction", "Analogus Prefrontal Interface", "Anti-Propogation ID"],
        "answer": "Application Programming Interface"
    },
    {
        "question": "What is the DOM?",
        "options": ["A CSS styling guide", "Javascript tool used for iteration", "Document Object Model", "HTML syntax guidelines"],
        "answer": "Document Object Model"
    },
    {
        "question": "Which part of the HTML document does the JavaScript tag go into?",
        "options": ["Top of the head", "Top of the body", "It doesn't go in the HTML document", "Bottom of the body"],
        "answer": "Bottom of the body"
    }
]

// function that displays the introduction screen
function displayIntro() {
    init();

    replayButton.textContent = "PLAY AGAIN?";
    description.textContent = "This is a JavaScript quiz coded using the JavaScript Browser API!\nClick on the start button to begin!"
    startButton.textContent = "START";
    // hides the score by default
    scoreEl.setAttribute("style", "display: none");
    mainEl.setAttribute("style", "display: none");

    title.textContent = "JavaScript Quiz";

    introEl.appendChild(title);
    introEl.appendChild(description);
    introEl.appendChild(startButton);
}

// renders the quiz section of the program
function displayQuiz() {
    mainEl.setAttribute("style", "display: block");
    scoreEl.textContent = "Score: " + score;
    startTimer();

    // starts at index 0, and progressively cycles through each question
    displayQuestion(questionNum);
}

// renders each indivual set of questions and answers
function displayQuestion(questionNum) {
    // sets the question value
    quizQuestionEl.textContent = "#" + (questionNum + 1) + ". " + answers[questionNum].question;

    // sets the
    a1.textContent = "a) " + answers[questionNum].options[0];
    quizAnswersEl.appendChild(a1);
    a2.textContent = "b) " + answers[questionNum].options[1];
    quizAnswersEl.appendChild(a2);
    a3.textContent = "c) " + answers[questionNum].options[2];
    quizAnswersEl.appendChild(a3);
    a4.textContent = "d) " + answers[questionNum].options[3];
    quizAnswersEl.appendChild(a4);
}

// event listener for the replay button at the end of the game
replayButton.addEventListener("click", function () {
    userStatsEl.setAttribute("style", "display: none");
    mainEl.setAttribute("style", "display: none");
    introEl.setAttribute("style", "display: block");
    replayButton.setAttribute("style", "display: none");

    displayIntro();
})

// event listener to clear the header content whem the 'start' button is clicked
startButton.addEventListener("click", function () {
    introEl.textContent = " ";
    mainEl.setAttribute("style", "display: block");
    displayQuiz();
})

// event listeners for each possible answer -- looks for a 'click' event
a1.addEventListener("click", function (event) {
    parseInput(0);

    if (questionNum < 4) {
        questionNum++;
        displayQuestion(questionNum);
    } else {
        finishedQuiz = true;
    }
});

a2.addEventListener("click", function (event) {
    parseInput(1);

    if (questionNum < 4) {
        questionNum++;
        displayQuestion(questionNum);
    } else {
        finishedQuiz = true;
    }
});

a3.addEventListener("click", function (event) {
    parseInput(2);

    if (questionNum < 4) {
        questionNum++;
        displayQuestion(questionNum);
    } else {
        finishedQuiz = true;
    }
});

a4.addEventListener("click", function (event) {
    parseInput(3);

    if (questionNum < 4) {
        questionNum++;
        displayQuestion(questionNum);
    } else {
        finishedQuiz = true;
    }
});

// sets global variable values
function init() {
    timeRemaining = 60;
    score = 0;
    finishedQuiz = false;
    questionNum = 0;
}

// compares the user input to the CORRECT answer in the question object
function parseInput(index) {
    // saves a new variable with the content of the answer minus the 'a) '
    var stringAnswer = JSON.stringify(event.target.textContent);
    stringAnswer = (stringAnswer.substring(4, stringAnswer.length - 1));

    if ((stringAnswer === answers[questionNum].answer)) {
        score++;
    } else {
        timeRemaining -= 5;
    }

    scoreEl.textContent = "Score: " + score;
    console.log(stringAnswer === answers[questionNum].answer);
}

// loops through items in local storage and displays them to the screen
function displayStats() {
    mainEl.setAttribute("style", "display: none");
    userStatsEl.setAttribute("style", "display: block");
    var localStorageEntries = Object.entries(localStorage);

    console.log(localStorage);
    for (var i = 0; i < localStorageEntries.length; i++) {
        var nextUser = document.createElement("h2");
        nextUser.className = "next-user";
        nextUser.textContent = (i + 1).toString() + ". " + localStorageEntries[i][0] + " -- " + localStorage.getItem(localStorageEntries[i][0]);
        userStatsEl.appendChild(nextUser);
    }

    replayButton.textContent = "PLAY AGAIN";
    replayButton.setAttribute("style", "display: block");
    document.body.appendChild(replayButton);
}

// ends the quiz and displays highscores
function endQuiz() {
    localStorage.setItem(playerData[0], playerData[1]);
    displayStats();
}

// starts the timer count down
function startTimer() {
    timerEl.setAttribute("style", "display: block");
    scoreEl.setAttribute("style", "display: block");
    quizQuestionEl.setAttribute("style", "display: block");

    timerEl.textContent = "Time remaining: " + timeRemaining + " seconds";
    scoreEl.textContent = "Score: " + score;
    var timer = setInterval(function () {
        timeRemaining--;
        timerEl.textContent = "Time remaining: " + timeRemaining + " seconds";
        // if there is time left over and the user finishes the quiz
        if (finishedQuiz && timeRemaining > 0 || timeRemaining <= 0) {
            playerData[0] = window.prompt("ENTER INITIAL: ");
            playerData[1] = score;
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// starts the quiz with the intro screen. Didnt use the init function because that would start the timer
displayIntro();