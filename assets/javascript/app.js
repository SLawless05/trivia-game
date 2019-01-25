//array of questions as objects
var questions = [
    {
        question: "How many planets are in the Solar System?",
        answers: [
            "8",
            "9",
            "10",
            "11"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            "Neptune",
            "Uranus",
            "Jupiter",
            "Pluto"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: [
            "Pluto",
            "Mercury",
            "Saturn",
            "Venus"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the most common type of star found in the Milky Way?",
        answers: [
            "Red Dwarf",
            "Red Giant",
            "Yellow Dwarf",
            "Blue Star"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the largest type of star in the universe?",
        answers: [
            "Red Giant",
            "Blue Supergiant",
            "Red Supergiant",
            "Neutron Star"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the closest star to the Sun?",
        answers: [
            "Alpha Centauri",
            "Proxima Centauri",
            "Luxa Stellari",
            "Keanu Reeves"
        ],
        correctAnswer: 1
    },
    {
        question: "Which planet is nearest to the earth?",
        answers: [
            "Mars",
            "Mercury",
            "Venus",
            "Uranus"
        ],
        correctAnswer: 1
    },
    {
        question: "Which Planet in our Solar System has the most moons?",
        answers: [
            "Mars",
            "Saturn",
            "Jupiter",
            "Venus"
        ],
        correctAnswer: 2
    },
    {
        question: "Which planet spins backwards reletive to the others?",
        answers: [
            "Uranus",
            "Pluto",
            "Mars",
            "Venus"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the hottest planet in the solar system?",
        answers: [
            "Mercury",
            "Mars",
            "Venus",
            "Jupiter"
        ],
        correctAnswer: 2
    }
]

//Variable declarations
var correct = 0;
var incorrect = 0;
var questionNum = 0;
var correctAnswerIndex;
var questionInterval;
var timerInterval;
var timeLeft;
var guess;


//***start*** function which runs when the start button is pressed and begins the game by hiding the start button and running displayQuestion.
function start() {
    correct = 0;
    incorrect = 0;
    questionNum = 0;
    timeLeft = 0;
    guess = null;

    //initial question call, couldn't get it to run a question without waiting the 30 seconds interval time before my first question.
    $("#response-answer").html("Please try and answer these space trivia questions!");
    setTimeout(displayQuestion, 5000);

    //intial timeout
    questionInterval = setInterval(nextQuestion, 30000);
    $("#start-button").hide();
}

//***end*** function which clears the questionInterval and redisplays the start button and clears the rest of the display and resets vaariables to their default values
function end() {
    clearInterval(questionInterval);
    questionInterval = null;
    clearInterval(timerInterval);
    timerInterval = null;

    $("#start-button").show();
    $("#question").empty();
    $("#time-remaining").empty();
    $("#answer-1").empty();
    $("#answer-2").empty();
    $("#answer-3").empty();
    $("#answer-4").empty();

    $("#correct").html("Correct Answers: " + correct);
    $("#incorrect").html("Incorrect Answers: " + incorrect);

    if (correct === 10) {
        $("#response-").html("Perfect!!!");
    }
    else if (correct >= 7) {
        $("#response").html("Good Job!");
    }
    else if (correct >= 4) {
        $("#response").html("Not Bad.");
    }
    else {
        $("#response").html("Not Great...");
    }

    $("#answer-1").on("click", null);
    $("#answer-2").on("click", null);
    $("#answer-3").on("click", null);
    $("#answer-4").on("click", null);
}

//***displayQuestion*** function that displays the questions and resets the timeleft to 30 as well as calling the updateTimeDisplay function on an interval "timeInterval" and calls "pickAnswer" when one of the answers are clicked.
function displayQuestion() {
    clearInterval(timerInterval);
    timeLeft = 25;
    timerInterval = setInterval(updateTimeDisplay, 1000);

    $("#question").html(questions[questionNum].question);
    $("#answer-1").html(questions[questionNum].answers[0]);
    $("#answer-2").html(questions[questionNum].answers[1]);
    $("#answer-3").html(questions[questionNum].answers[2]);
    $("#answer-4").html(questions[questionNum].answers[3]);
    $("#correct").html("Correct Answers: " + correct);
    $("#incorrect").html("Incorrect Answers: " + incorrect);
    $("#response").empty();
    $("#response-answer").empty();

    $("#answer-1").on("click", pickAnswer);
    $("#answer-2").on("click", pickAnswer);
    $("#answer-3").on("click", pickAnswer);
    $("#answer-4").on("click", pickAnswer);
}

//***nextQuestion*** function that provides the timeout break between questions and decides whether the player got the question correct or wrong and tallies them up into correct and incorrect variables
function nextQuestion() {

    $("#answer-1").on("click", null);
    $("#answer-2").on("click", null);
    $("#answer-3").on("click", null);
    $("#answer-4").on("click", null);

    clearInterval(timerInterval);

    correctAnswerIndex = questions[questionNum].correctAnswer;

    if (guess === correctAnswerIndex) {
        console.log("correct answer");
        correct++;
        $("#response").html("Correct! :)")
        $("#response-answer").html("The Correct Answer was: " + questions[questionNum].answers[correctAnswerIndex]);
    }
    else {
        console.log("incorrect answer");
        incorrect++;
        $("#response").html("Inorrect! :(")
        $("#response-answer").html("The Correct Answer was: " + questions[questionNum].answers[correctAnswerIndex]);
    }
    guess = null;

    questionNum++;

    if (questionNum < 10) {
        setTimeout(displayQuestion, 5000);
    }
    else {
        end();
    }
}

//***updateTimeDisplay*** this function updates the time display on the screen using an interval.
function updateTimeDisplay() {
    timeLeft--;
    $("#time-remaining").html("Time Remaining: " + timeLeft + " seconds left");
}

//***pickAnswer*** this function contains the logic that runs when an answer is picked on the screen.
function pickAnswer() {
    if (this.id === "answer-1") {
        guess = 0;
    }
    else if (this.id === "answer-2") {
        guess = 1;
    }
    else if (this.id === "answer-3") {
        guess = 2;
    }
    else {
        guess = 3;
    }

    $("#response-answer").html("Your Guess: " + questions[questionNum].answers[guess]);
}

//sets up the start button on-click on pageload.
window.onload = function () {
    $("#start-button").on("click", start);
    $("#response-answer").html("Instructions: You will have 25 seconds to answer each question. once you press start there will be a 5 second delay and then the game will begin.");
};



