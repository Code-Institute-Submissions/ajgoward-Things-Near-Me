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

   document.getElementById("after_quiz").style.visibility = "visible";
   document.getElementById("correct").innerHTML = ("You got" + total + "Correct");

}