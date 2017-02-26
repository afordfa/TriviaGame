
$(document).ready(function() {

		//default value for user choice is -1, because it is used to compare to
		//an index value of an array. Needs to start as a non-valid value for an index position
	var userChoice = -1;
	var answeredQuestion = false;
	var currentQuestion = {};
	var counter = 0;
	var scoreCorrect = 0;
	var scoreIncorrect = 0;
	var scoreUnanswered = 0;
	var answerTimeoutId = ""
	var timeoutId = "";
	var intervalId = ""
	var timeQuestion = 5;
	
	
	$(document).on("click", ".startGame", function() {
		// stop();
		console.log(questionArray);
		clearTimeout(timeoutId);
		clearTimeout(answerTimeoutId);
		clearInterval(intervalId);
		$(".timerSection").html("5");
		userChoice = -1;
		answeredQuestion = false;
		currentQuestion = {};
		counter = 0;
		scoreCorrect = 0;
		scoreIncorrect = 0;
		scoreUnanswered = 0;
		timeoutId = "";
		answerTimeoutId = "";
		intervalId = "";
		showQuestion(); 
	});



	// **********************************************
	// pass variables to create question objects
	var q1 = createQuestion(	
		// number, text, choices, correct, image
		1,
		"Who did Alexander Hamilton marry?",
		["Elizabeth Schuyler", "Angelica Schuyler", "Maria Reynolds", "Abigail Adams"],
		0,
		"../assets/q1.jpeg"
		);

	var q2 = createQuestion(	
		// number, text, choices, correct, image
		2,
		"How many children did Alexander Hamilton have?",
		["4", "8", "7", "6"],
		2,
		"../assets/q2.jpeg"
		);

	var q3 = createQuestion(	
		// number, text, choices, correct, image
		3,
		"Where was Alexander Hamilton born",
		["Boston", "St. Kitts and Nevis", "New York City", "Barbados"],
		1,
		"../assets/q3.jpeg"
		);
	// **********************************************




	// **********************************************
	// Function to create question objects
	
	function createQuestion(number, text, choices, correct, image) {
		var question = {
			number: number,
			text: text,
			choices: choices,
			correct: correct,
			image: image 
		}
		return question;
	};
	// **********************************************
	

	var questionArray = [q1, q2, q3];
	
	





	function showQuestion() {
		$(".startSection").empty();
		$(".questionSection").empty();
		$(".choicesSection").empty();
		currentQuestion = questionArray[counter];
		console.log("array: " + questionArray);
		console.log("counter: " + counter);
		console.log("question: " + currentQuestion);
		var currentQuestionText = $("<div class = \"questionText\">" + questionArray[counter].text + "</div>");
		$(".questionSection").append(currentQuestionText);
		var currentChoices = questionArray[counter].choices;
		for (var i = 0; i < currentChoices.length; i++) {
			var getChoicesSection = $(".choicesSection");
			var choiceListItem = $("<div><button class = \"answer btn btn-primary\" value = " + i + " > <h3>" + currentChoices[i] + "</h3></button></div>");
			getChoicesSection.append(choiceListItem);
		}
		$(".answer").on("click", function() {
			userChoice = this.value;
			answeredQuestion = true;
			clearTimeout(timeoutId);
			clearInterval(intervalId);
			showAnswer();
			
		});
		var currentChoices = questionArray[counter].choices;
		start()
		timeoutId = setTimeout(questionTimer, 1000 * 5);
	}


	function showAnswer() {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		answerTimeoutId = setTimeout(answerTimer, 1000 * 5);
		$(".choicesSection").empty();
		$(".timerSection").empty();
		$(".timerDiv").empty();
		if (userChoice == currentQuestion.correct) {
			scoreCorrect++;
			var correctResponse = $("<div class = \"answerText\">Correct!</div>");
			$(".timerSection").append(correctResponse);	
		} else if (answeredQuestion == true) {
			scoreIncorrect++
			var correctResponse = $("<div class = \"answerText\">Incorrect!</div>");
			$(".timerSection").append(correctResponse);	
		} else {
			scoreUnanswered++
			var correctResponse = $("<div class = \"answerText\">Time's Up!</div>");
			$(".timerSection").append(correctResponse);				
		}
	}

	function questionTimer() {
  		clearInterval(intervalId)
  		$(".timerSection").removeClass("timerSectionRed");
  		// counter++;
  		// if (counter < questionArray.length) {
  		// 	showAnswer();
  		// }
  		showAnswer();
	}

	function answerTimer () {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		counter++
		answeredQuestion = false;
  		if (counter < questionArray.length) {
  			showQuestion();
  		} else {
  			gameOver();

  		}
	}





	function reset() {

	  timeQuestion = 5;

	  $(".timerSection").html("00:5");

	}

	function start() {
		$(".timerDiv").empty();
		timeQuestion = 5;
		$(".timerDiv").append("<div class = \"timerSection\"></div>");
	 	$(".timerSection").html("10");
	 	intervalId = setInterval(count, 1000);
	}

	function stop() {
		timeQuestion = 0;
	  	clearInterval(intervalId);
	}




	function count() {
	 	timeQuestion--;
		$(".timerSection").html(timeQuestion);
	 	if (timeQuestion <= 5) {
	 		$(".timerSection").addClass("timerSectionRed");
	 	} else {
	 		$(".timerSection").removeClass("timerSectionRed");
	 	}

	}


	function gameOver() {
		//display score
		//display restart button
		console.log("Correct: " + scoreCorrect);
  		console.log("Incorrect: " + scoreIncorrect);
		$(".questionSection").empty();
		$(".choicesSection").empty();
		$(".timerSection").empty();
		$(".startSection").append("<button class = \"startGame\">Play Again</button>");
		$(".choicesSection").append("<div class = \"scores\">Correct: " + scoreCorrect + " </div>");
		$(".choicesSection").append("<div class = \"scores\">Incorrect: " + scoreIncorrect + " </div>");
		$(".choicesSection").append("<div class = \"scores\">Unanswered: " + scoreUnanswered + " </div>");

	};
	
	// **********************************************




	});
