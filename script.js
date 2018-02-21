//create variables for questions, 4 answers, and correct answer 
var officeQuestions = [
    {
        question: "Who did Michael accidentally hit in the parking lot?",
        answerOptions: ["Kelly", "Toby", "Meredith", "Phyllis"],
        answer: 2,
    },
    {
        question: "What's the worst thing about prison, according to Prison Mike?",
        answerOptions: ["The Orcs", "The Dementors", "The Banshees", "The Stormtroppers"],
        answer: 1,
    },
    {
        question: "What food did Kevin spill all over the office floor?",
        answerOptions: ["Gravy", "Spaghetti", "Tortilla Soup", "Chili"],
        answer: 3,
    },
    {
        question: "Where did Michael and Jan go on vacation to?",
        answerOptions: ["Paris, France", "Cabo, Mexico", "New York City, USA", "Sandals Jamaica"],
        answer: 3,
    },
    {
        question: "Jim does what to Dwight's stapler?",
        answerOptions: ["Glues it to his desk", "Puts it in jello", "Puts it in the bathroom", "Hide it in his drawer"],
        answer: 1,
    },
    {
        question: "What is Erin's real name?",
        answerOptions: ["Pam", "Phyllis", "Kelly", "Angela"],
        answer: 2,
    },
    {
        question: "What college did Andy graduate from?",
        answerOptions: ["Columbia", "Brown", "Dartmouth", "Cornell"],
        answer: 3,
    },
    {
        question: "What is an event in the Office Olympics",
        answerOptions: ["Office Chase", "Flonkerton", "Trash Pong", "Bear Shoot"],
        answer: 1,
    },
    {
        question: "Which character has a wig for everyone in the office?",
        answerOptions: ["Michael", "Jim", "Pam", "Dwight"],
        answer: 3,
    },
    {
        question: "Who did the office have a dance party on their last day? ",
        answerOptions: ["Stanley", "Oscar", "Darryl", "Kevin"],
        answer: 2,
    },
];
//gif's for each question 
var gif = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];
//variables for current question & answer, answer selected by user, correct & incorrect answer, time, did not answer in time, messages displayed 
var currentQuestion = 0
var currentAnswer = 0
var userSelected = ""
var correctAnswer = 0
var incorrectAnswer = 0
var seconds = ""
var time = ""
var unanswered = 0
var answered

var message = {
    correct: "You have earned a Shrute Buck!",
    incorrect: "Dwight, you ignorant slut!",
    outOfTime: "'You miss 100% of the shots you don't take' - Wayne Gretzky - Michael Scott",
    finished: "Congrats!"
}

$(document).ready(function () {
    //start button to start game 
    $("#startBtn").click(function () {
        startQuiz();
        $("#startBtn").hide()
    });

    function startQuiz() {
        currentQuestion = 0;
	    correctAnswer = 0;
	    incorrectAnswer = 0;
	    unanswered = 0;
        newQuestion();
    }

    //function for questions 
    function newQuestion () {
        //empty divs that arent relevant to actual quiz yet 
        $("#message").empty();
        $("#actualAnswer").empty();
        $("#gif").empty();
        //display question title 
        $("#questionTitle").html('<h2>' + 'Question ' + (currentQuestion + 1) + ' out of ' + officeQuestions.length + '</h2>' + '<br>')
        //display question
        $("#question").html('<h3>' + officeQuestions[currentQuestion].question + '</h3>')
        //display answer options
        for (var i = 0; i < 4; i++) {
            $("#answers").append('<p>' + officeQuestions[currentQuestion].answerOptions[i] + '</p>')
        }
        countdown();
        //clicking an answer will pause the time and setup answer page
        $('#answers').on('click', function () {
            userSelected = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    }

    //sets timer to go down
    function countdown() {
        seconds = 20;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--
        $('#timeLeft').html('<h4>Time Remaining: ' + seconds + '</h4>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    //display message & gif after answering question 
    function answerPage() {

        //empty question page
        $("#question").empty ()
        $("#answers").empty ()
        $("#timeLeft").empty ()

        //define the text displayed for correct answer and which index is the correct answer using a for loop 
        for (var i = 0; i < 4; i++) {
        var correctAnswerText = officeQuestions[currentQuestion].answerOptions[officeQuestions[currentQuestion].answer]
        var correctAnswerIndex = officeQuestions[currentQuestion].answer;
            console.log(correctAnswerIndex)
        }

        //display gif when answer clicked 
        $("#gif").html('<img src = "./assets/gifs/' + gif[currentQuestion] + '.gif" width = "400px">')
        
        //if else statements for correct, incorrect or unanswered 
        if ((userSelected === correctAnswerIndex) && (answered === true)) {
            correctAnswer++
            $("#message").html(message.correct)
        }
        else if ((userSelected != correctAnswerIndex) && (answered === true)) {
            incorrectAnswer++
            $("#message").html(message.incorrect)
            $('#actualAnswer').html('The correct answer was: ' + correctAnswerText);
        }
        else {
            unanswered++;
            $('#message').html(message.outOfTime);
            $('#actualAnswer').html('The correct answer was: ' + correctAnswerText);
            answered = true;
        }
        if(currentQuestion == (officeQuestions.length-1)){
            setTimeout(scoreboard, 5000)
        } else{
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }	
    }
    //display final message and how many unanswered questions 
    function scoreboard () {
        $("#timeLeft").empty()
        $("#message").empty()
        $("#correctAnswers").empty()
        $("#actualAnswer").empty()
        $("#gif").empty()

        $("#finalMessage").html("<p>" + message.finished + "</p>")
        $("#correctAnswers").html("<p>" + "You earned " + correctAnswer + " Shrute Bucks!" + "</p>")
        $("#incorrectAnswers").html("<p>" + "Incorrect: " + incorrectAnswer + "</p>")
        $("#unanswered").html("<p>" + "Unanswered: " + unanswered + "</p>")
    }
})