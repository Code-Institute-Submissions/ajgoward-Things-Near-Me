/*----- i recieved a tutorial for this here https://www.youtube.com/watch?v=C7NsIRhoWuE --*/
function check(){
   var question1 = document.quiz.question1.value;
   var question2 = document.quiz.question2.value;
   var question3 = document.quiz.question3.value;
   var question4 = document.quiz.question4.value;
   var total = 0;

   if (question1 == "affection"){
       total++;
   }
   if (question2 == "communicate"){
       total++;
   }
   if (question3 == "Yes"){
       total++;
   }
   if (question4 == "bored"){
       total++;
   }

   var messages = ["Well done", "Middle of the Road", "Do you Even have A Dog?"]
   var pictures = ["assets/images/allcorrect.gif","assets/images/middle.gif","assets/images/dognocorrect.gif"]

   var range;

   if (total < 1){
       range = 2;
    }
    if (total > 0 && total < 3){
        range = 1;
    }
    if (total > 3){
        range = 0;
    }

   document.getElementById("after_quiz").style.visibility = "visible";
   document.getElementById("message").innerHTML = messages[range]
   document.getElementById("correct").innerHTML = ("You got " + total + " Correct");
   document.getElementById("picture").src = pictures[range];

}