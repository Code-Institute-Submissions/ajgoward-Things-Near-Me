/*----- i recieved a tutorial for this here https://www.youtube.com/watch?v=C7NsIRhoWuE 
The function completeQuiz is run when the quiz button is clicked--*/
function completeQuiz() {
    /*---- these variables search the quiz.html find the id quiz and find the questions with the id question 1 etc. and then find the value of each, also i start the 
    total off at zero as a base ----*/
    var question1 = document.quiz.question1.value;
    var question2 = document.quiz.question2.value;
    var question3 = document.quiz.question3.value;
    var question4 = document.quiz.question4.value;
    var question5 = document.quiz.question5.value;
    var question6 = document.quiz.question6.value;
    var question7 = document.quiz.question7.value;
    var question8 = document.quiz.question8.value;
    var question9 = document.quiz.question9.value;
    var question10 = document.quiz.question10.value;
    var total = 0;
    var right = ('<i class="fas fa-check"> Correct!</i>');
    var wrong = ('<i class="fas fa-times"> Incorrect!</i>')

    /*----- i then start a if statement and if the question is equal to the correct answer then add one to the total also say whethe the
    question is correct or wrong---*/
    if (question1 == "affection") {
        total++;
        document.getElementById("RightQ1").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ1").innerHTML = (wrong))

    if (question2 == "communicate") {
        total++;
        document.getElementById("RightQ2").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ2").innerHTML = (wrong))

    if (question3 == "Yes") {
        total++;
        document.getElementById("RightQ3").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ3").innerHTML = (wrong))

    if (question4 == "bored") {
        total++;
        document.getElementById("RightQ4").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ4").innerHTML = (wrong))

    if (question5 == "corgi") {
        total++;
        document.getElementById("RightQ5").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ5").innerHTML = (wrong))

    if (question6 == "29") {
        total++;
        document.getElementById("RightQ6").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ6").innerHTML = (wrong))

    if (question7 == "chihuahua") {
        total++;
        document.getElementById("RightQ7").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ7").innerHTML = (wrong))

    if (question8 == "smell") {
        total++;
        document.getElementById("RightQ8").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ8").innerHTML = (wrong))

    if (question9 == "true") {
        total++;
        document.getElementById("RightQ9").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ9").innerHTML = (wrong))

    if (question10 == "Dog") {
        total++;
        document.getElementById("RightQ10").innerHTML = (right);
    }
    else (wrong = document.getElementById("WrongQ10").innerHTML = (wrong))
    /* ----- these are my message and image arrays to use if the user gets a certain number correct ----*/
    var messages = ["Well done", "Middle of the Road", "Do you Even have A Dog?"]
    var gifs = ["assets/images/allcorrect.gif", "assets/images/middle.gif", "assets/images/dognocorrect.gif"]
    /*---- display this will be used to iterate through the arrays ----*/
    var display;
    /*---- if statements if the total is a certain number let the display be a number from 0-2 to
    display the right message and image ----*/
    if (total < 2) {
        display = 2;
    }
    else if (total > 0 && total < 6) {
        display = 1;
    }
    else (display = 0)
        ;

    /*------- these search the document for the ids to make my div visible , to display the correct messages and to display the 
    correct image ---*/
    document.getElementById("after_quiz").style.visibility = "visible";
    document.getElementById("message").innerHTML = messages[display]
    document.getElementById("correct").innerHTML = ("You got " + total + " Correct");
    document.getElementById("picture").src = gifs[display];

}



/*----https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript---*/
function restart() {
    location.reload();
    return false;
}

