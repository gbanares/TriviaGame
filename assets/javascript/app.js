$(document).ready(function () {

    // global variables
    // ---------------------------------------------------------------------->

    // array to hold all my questions
    var questions = [
        {
            question: "What is the best way to eat sushi?",
            answers: ["With your hands", "With a fork", "With chopsticks", "With your fingers"],
            answer: "With your fingers"
        },
        {
            question: "What is nori?",
            answers: ["Dried seaweed", "Rice paper", "Fresh seaweed", "A type of fish"],
            answer: "Dried seaweed"
        },
        {
            question: "What is wasabi?",
            answers: ["A spicy green root", "Pickled ginger", "A white radish", "Fermented rice wine"],
            answer: "A spicy green root"
        },
        {
            question: "Name this fish: Maguro",
            answers: ["Yellowtail", "Snapper", "Tuna", "Octopus"],
            answer: "Tuna"
        },
        {
            question: "Name this fish: Ika",
            answers: ["Mackerel", "Salmon", "Shrimp", "Squid"],
            answer: "Squid"
        }
    ]

    // will value of the timer
    var counter;

    //  Variable that will hold our interval ID when we execute
    //  the "run" function
    var intervalId;

    // game scores
    var correct = 0;
    var incorrect = 0;

    // functions
    // ---------------------------------------------------------------------->

    function runTimer() {
        // update dom
        counter = 120;
        $('.timer').text(counter);
        // clear intervalId so timer doesnt run multiple times
        clearInterval(intervalId);
        // every 1 sec, run the decrementTimer function
        intervalId = setInterval(decrementTimer, 1000);
    };

    function decrementTimer() {
        // decrease timer by 1
        counter--;
        // if the timer is at 0, stop the timer
        if (counter === 0) {
            console.log('timer stopped');
            stopTimer();
        }
        // update dom
        $('.timer').text(counter);
    };

    function stopTimer() {
        // clears the timer
        clearInterval(intervalId);
        // submit game
        submitGame();
    };


    function addQuestions() {
        // loop through questions array
        for (var i = 0; i < questions.length; i++) {
            // for every question, create a h4 to hold the question
            $('.questions-box').append("<h5>" + (i + 1) + ": " + questions[i].question + "</h5>");
            // loop through the answers array for current question
            for (var k = 0; k < questions[i].answers.length; k++) {
                // create a radio button for every answer option and append it to the screen
                // keep the name for each radio-btn group the same
                // this makes it so you can only choose 1 radio-btn for each question
                $('.questions-box').append("<input type='radio' value='" + questions[i].answers[k] + "' name='question-" + i + "'>"  + "  " + questions[i].answers[k] + "<br>");
            }
            // add a line after every question for styling
            $('.questions-box').append("<hr>");
        }
    };

    function submitGame() {
        // loop through array of questions
        for (var i = 0; i < questions.length; i++) {
            // for each button grounp, check to see if there is a button thats checked
            // if there is, check to see if its value = the correct answer
            // add 1 to correct or incorrect, then move onto the next question
            $.each($("input[name='question-" + i + "']:checked"), function () {
                var userGuess = $(this).attr('value');
                console.log('User Guess: ' + userGuess);
                if (userGuess === questions[i].answer) {
                    console.log('You got the right answer!');
                    correct++;
                } else {
                    console.log('Sorry wrong answer');
                    incorrect++;
                }
            });
        }

        // add scores to dom, and change display state
        $('span#correct').text(correct);
        $('span#incorrect').text(incorrect);
        $('.end-screen').show();
    };

    // starts a new triva game, called on page load
    function newGame() {
        // clear out questions if any are there
        $('.questions-box').html("");
        // hide the scores
        $('.end-screen').hide();
        // reset variables
        correct = 0;
        incorrect = 0;
        // randomize the answers array
        shuffleArray();
        // append questions to screen
        addQuestions();
        // start timer
        runTimer()
    };

    function shuffleArray() {
        // loops through teh questions object, and randomize each answers array
        for (var i = 0; i < questions.length; i++) {
            questions[i].answers.sort(function (a, b) { return 0.5 - Math.random() });
        }
    }


    // main process
    // ---------------------------------------------------------------------->

    // start game on page load
    newGame();

    $('#submit').on('click', function () {
        stopTimer();
    });

    $('#newGame').on('click', function () {
        newGame();
    })

});