

const darkModeButton = document.getElementById("darkModeButton");

darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkModeButton.textContent = " Light mode";
    } else {
        darkModeButton.textContent = " Dark mode";
    }
});




const startClickGame = document.getElementById("startClickGame");
const clickButton = document.getElementById("clickButton");
const clickScoreText = document.getElementById("clickScore");
const clickTimeText = document.getElementById("clickTime");
const clickMessage = document.getElementById("clickMessage");
const clickHighscoreText = document.getElementById("clickHighscore");

let clickScore = 0;
let clickTime = 10;
let clickTimer;



let clickHighscore = localStorage.getItem("clickHighscore");

if (clickHighscore === null) {
    clickHighscore = 0;
}

clickHighscoreText.textContent = clickHighscore;



startClickGame.addEventListener("click", function () {

    clickScore = 0;
    clickTime = 10;

    clickScoreText.textContent = clickScore;
    clickTimeText.textContent = clickTime;

    clickButton.disabled = false;
    startClickGame.disabled = true;

    clickMessage.textContent = "GO! Klik zo snel mogelijk!";

    clickTimer = setInterval(function () {

        clickTime--;

        clickTimeText.textContent = clickTime;

        if (clickTime <= 0) {
            endClickGame();
        }

    }, 1000);
});



clickButton.addEventListener("click", function () {

    clickScore++;

    clickScoreText.textContent = clickScore;
});



function endClickGame() {

    clearInterval(clickTimer);

    clickButton.disabled = true;
    startClickGame.disabled = false;

    clickMessage.textContent =
        " Tijd voorbij! Je score is " + clickScore + "!";

    if (clickScore > Number(clickHighscore)) {

        clickHighscore = clickScore;

        localStorage.setItem("clickHighscore", clickHighscore);

        clickHighscoreText.textContent = clickHighscore;

        clickMessage.textContent += "  NIEUWE HIGHSCORE!";
    }
}




const startColorGame = document.getElementById("startColorGame");
const colorQuestion = document.getElementById("colorQuestion");
const colorScoreText = document.getElementById("colorScore");
const colorMessage = document.getElementById("colorMessage");
const colorButtons = document.querySelectorAll(".color-button");
const colorHighscoreText = document.getElementById("colorHighscore");

let colorScore = 0;
let correctColor = "";

let colorHighscore = localStorage.getItem("colorHighscore");

if (colorHighscore === null) {
    colorHighscore = 0;
}

colorHighscoreText.textContent = colorHighscore;



function chooseColor() {

    const colors = [
        "rood",
        "blauw",
        "groen",
        "geel"
    ];

    const randomNumber = Math.floor(Math.random() * colors.length);

    correctColor = colors[randomNumber];

    colorQuestion.textContent =
        "Klik op: " + correctColor;
}



startColorGame.addEventListener("click", function () {

    colorScore = 0;

    colorScoreText.textContent = colorScore;

    colorMessage.textContent = "";

    startColorGame.textContent = "Nieuwe ronde";

    chooseColor();
});



colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (correctColor === "") {
            colorMessage.textContent =
                "Klik eerst op Start Game!";
            return;
        }

        const clickedColor = button.dataset.color;

        if (clickedColor === correctColor) {

            colorScore++;

            colorScoreText.textContent = colorScore;

            colorMessage.textContent = " Goed!";

            chooseColor();

        } else {

            colorMessage.textContent =
                " Fout! Het was " + correctColor + ".";

            if (colorScore > Number(colorHighscore)) {

                colorHighscore = colorScore;

                localStorage.setItem(
                    "colorHighscore",
                    colorHighscore
                );

                colorHighscoreText.textContent = colorHighscore;
            }

            colorScore = 0;
            colorScoreText.textContent = colorScore;

            chooseColor();
        }
    });
});




const questions = [
    {
        question: "Welke taal gebruik je voor de structuur van een website?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: "HTML"
    },

    {
        question: "Welke taal gebruik je voornamelijk voor styling?",
        answers: [
            "PHP",
            "HTML",
            "CSS",
            "Python"
        ],
        correct: "CSS"
    },

    {
        question: "Welke taal maakt een website interactief?",
        answers: [
            "JavaScript",
            "HTML",
            "CSS",
            "SQL"
        ],
        correct: "JavaScript"
    },

    {
        question: "Welke functie gebruik je om iets in de console te tonen?",
        answers: [
            "print()",
            "console.log()",
            "show()",
            "write()"
        ],
        correct: "console.log()"
    },

    {
        question: "Waarmee kun je gegevens lokaal in de browser opslaan?",
        answers: [
            "localStorage",
            "HTML",
            "CSS",
            "div"
        ],
        correct: "localStorage"
    }
];


const startQuiz = document.getElementById("startQuiz");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizScoreText = document.getElementById("quizScore");
const quizMessage = document.getElementById("quizMessage");
const quizHighscoreText = document.getElementById("quizHighscore");

let quizScore = 0;
let currentQuestion = 0;

let quizHighscore = localStorage.getItem("quizHighscore");

if (quizHighscore === null) {
    quizHighscore = 0;
}

quizHighscoreText.textContent = quizHighscore;



startQuiz.addEventListener("click", function () {

    quizScore = 0;
    currentQuestion = 0;

    quizScoreText.textContent = quizScore;
    quizMessage.textContent = "";

    showQuestion();
});



function showQuestion() {

    if (currentQuestion >= questions.length) {

        endQuiz();

        return;
    }

    const question = questions[currentQuestion];

    quizQuestion.textContent = question.question;

    quizAnswers.innerHTML = "";

    question.answers.forEach(function (answer) {

        const button = document.createElement("button");

        button.textContent = answer;

        button.classList.add("answer-button");

        button.addEventListener("click", function () {

            checkAnswer(answer);
        });

        quizAnswers.appendChild(button);
    });
}



function checkAnswer(answer) {

    const question = questions[currentQuestion];

    if (answer === question.correct) {

        quizScore++;

        quizScoreText.textContent = quizScore;

        quizMessage.textContent = " Goed antwoord!";

    } else {

        quizMessage.textContent =
            " Fout! Het goede antwoord was " +
            question.correct;
    }

    currentQuestion++;

    setTimeout(function () {
        showQuestion();
    }, 700);
}



function endQuiz() {

    quizQuestion.textContent =
        " Quiz afgelopen!";

    quizAnswers.innerHTML = "";

    quizMessage.textContent =
        "Je hebt " + quizScore +
        " van de " + questions.length +
        " vragen goed.";

    if (quizScore > Number(quizHighscore)) {

        quizHighscore = quizScore;

        localStorage.setItem(
            "quizHighscore",
            quizHighscore
        );

        quizHighscoreText.textContent = quizHighscore;

        quizMessage.textContent +=
            "  NIEUWE HIGHSCORE!";
    }
}




const resetScores = document.getElementById("resetScores");

resetScores.addEventListener("click", function () {

    localStorage.removeItem("clickHighscore");
    localStorage.removeItem("colorHighscore");
    localStorage.removeItem("quizHighscore");

    clickHighscore = 0;
    colorHighscore = 0;
    quizHighscore = 0;

    clickHighscoreText.textContent = 0;
    colorHighscoreText.textContent = 0;
    quizHighscoreText.textContent = 0;

    alert(" Alle highscores zijn gereset!");
});

