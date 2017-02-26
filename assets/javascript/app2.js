
$(document).ready(function() {

	var userChoice = -1;
	var answeredQuestion = false;
	var currentQuestion = {};
	var timeQuestion = 10;
	var counter = 0

	// **********************************************
	// CLICK HANDLERS

	$(".startGame").on("click", function() {
		stop()
		$(".timerDiv").empty()
		$(".timerDiv").append("<div class = \"timerSection\"></div>");
	 	$(".timerSection").html("00:10");
		console.log("click");
	});

	$(".answer").on("click", function() {
		userChoice = this.value;
		console.log(userChoice);
		answeredQuestion = true;
		showAnswer()
	});



	// **********************************************
	// TIMER FUNCTIONS

	function reset() {
	  timeQuestion = 10;
	  $(".timerSection").html("00:10");
	}

	function start() {
		$(".timerDiv").empty();
		timeQuestion = 10;
		$(".timerDiv").append("<div class = \"timerSection\"></div>");
	 	$(".timerSection").html("00:10");
	 	intervalId = setInterval(count, 1000);
	}

	function stop() {
	  clearInterval(intervalId);
	}

			// <div class="col-md-4 class=timerDiv">
			// 	<div class="timerSection">00:15</div>
			// </div>



	function count() {
	 	timeQuestion--;
		var converted = timeConverter(timeQuestion);
		$(".timerSection").html(converted);
	 	if (timeQuestion <= 5) {
	 		console.log("testing time");
	 		$(".timerSection").addClass("timerSectionRed");
	 	} else {
	 		$(".timerSection").removeClass("timerSectionRed");
	 	}
	}

	function timeConverter(t) {
	  var minutes = Math.floor(t / 60);
	  var seconds = t - (minutes * 60);
	  if (seconds < 10) {
	    seconds = "0" + seconds;
	  }
	  if (minutes === 0) {
	    minutes = "00";
	  }
	  else if (minutes < 10) {
	    minutes = "0" + minutes;
	  }
	  return minutes + ":" + seconds;
	}

	function questionTimer() {
  		clearInterval(intervalId)
  		$(".timerSection").removeClass("timerSectionRed");
  		counter++;
  		if (counter < questionArray.length) {
  			showAnswer();
  		}
	}



	// **********************************************
	// CREATE QUESTION OBJECTS
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
		2,
		"Where was Alexander Hamilton born",
		["Boston", "St. Kitts and Nevis", "New York City", "Barbados"],
		1,
		"../assets/q3.jpeg"
		);
	// **********************************************




	// **********************************************
	// FUNCTION TO CREATE QUESTION OBJECTS
	
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

	console.log(questionArray);
	console.log(questionArray[0].text);


	
	showQuestion(); 
	function showQuestion() {
		$(".questionSection").empty();
		$(".choicesSection").empty();
		currentQuestion = questionArray[counter];
		var currentQuestionText = $("<div class = \"questionText\">" + questionArray[counter].text + "</div>");
		$(".questionSection").append(currentQuestionText);
		var currentChoices = questionArray[counter].choices;
		for (var i = 0; i < currentChoices.length; i++) {
			var getChoicesSection = $(".choicesSection");
			var choiceListItem = $("<div><button class = \"answer btn btn-primary\" value = " + i + " > <h3>" + currentChoices[i] + "</h3></button></div>");
			getChoicesSection.append(choiceListItem)
			console.log(currentChoices[i])
		}
		var currentChoices = questionArray[counter].choices;
		console.log(currentChoices);
		start()
		setTimeout(questionTimer, 1000 * 10);
	}


	function showAnswer() {
		$(".choicesSection").empty();
		$(".timerDiv").empty();
		if (userChoice == currentQuestion.correct) {
			var correctResponse = $("<div class = \"answerText\">Correct!</div>");
			$(".timerDiv").append(correctResponse);	
		} else if (answeredQuestion == true) {
			var correctResponse = $("<div class = \"answerText\">Incorrect!</div>");
			$(".timerDiv").append(correctResponse);	
		} else {
			var correctResponse = $("<div class = \"answerText\">Time's Up!</div>");
			$(".timerDiv").append(correctResponse);				
		}
	}






	});


