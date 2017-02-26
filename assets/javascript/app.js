
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
	var timeQuestion = 15;
	var additionalInfo = "";
	
	





	// **********************************************
	// pass variables to create question objects
	var q1 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		1,
		"Who did Alexander Hamilton marry?",
		["Elizabeth Schuyler", "Angelica Schuyler", "Maria Reynolds", "Abigail Adams"],
		0,
		"../assets/q1.jpeg",
		"Hamilton's \"best of wives and best of women\" was Elizabeth \"Eliza\" Schuyler Hamilton"
		);

	var q2 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		2,
		"How many children did Alexander Hamilton have?",
		["4", "8", "7", "6"],
		2,
		"../assets/q2.jpeg",
		"Philip(1782), Angelica(1784), Alexander Jr.(1786), James Alexander(1788), John Church(1792), William Stephen(1797), Elizabeth(1799), Philip(1802)"
		);

	var q3 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		3,
		"Where was Alexander Hamilton born",
		["Boston", "St. Kitts and Nevis", "New York City", "Barbados"],
		1,
		"../assets/q3.jpeg",
		"Dropped in the middle of a forgotten spot in the Carribbean by providence impoverished in squalor...in St. Kitts and Nevis"
		);

	var q4 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		4,
		"What friend of Hamilton's arranged for guns and ships, so the balance shifts?",
		["Hercules Mulligan", "John Laurens", "King George III", "Marquis de Lafayette"],
		3,
		"../assets/q4.jpeg",
		"An immigrant you know and love who's unafraid to step in. Everyone give it up for America's favorite figting Frenchman...Lafayette!"
		);

	var q5 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		5,
		"What cabinet position did Hamilton hold?",
		["Treasury Secretary", "Secretary of State", "Secretary of War", "Secretary of Labor"],
		0,
		"../assets/q5.jpeg",
		"Sir, do you want me to run the Treasury or State Department?  Treasury. OK - Let's go!"
		);

	var q6 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		6,
		"How did Hamilton die?",
		["Lost at Sea", "Old Age", "Shot in a Duel", "Smallpox"],
		2,
		"../assets/q6.jpeg",
		"He aims is his pistol at the sky... Hamilton was killed by Vice President Aaron Burr in a duel."
		);

	var q7 = createQuestion(	
		// number, text, choices, correct, image, answerComment
		7,
		"How many of The Federalist Papers did Hamilton write?",
		["85", "29", "51", "5"],
		2,
		"../assets/q7.jpeg",
		"The plan was to write a total of 25 essays, the work divided evenly among the three men. "
		+ "In the end, they wrote 85 essays over the span of six months. John Jay got sick after writing five. "
		+ "James Madison wrote 29. Hamilton wrote the other 51!"
		);
	// **********************************************


	// Function to create question objects
	
	function createQuestion(number, text, choices, correct, image, answerComment) {
		var question = {
			number: number,
			text: text,
			choices: choices,
			correct: correct,
			image: image, 
			answerComment: answerComment
		}
		return question;
	};
	// **********************************************
	

	var questionArray = [q1, q2, q3, q4, q5, q6, q7];
	
	

	//when game is started or restarted, sets all variables back to starting values.
	//Changes page header from large version (head and subhead) to smaller version (smaller head only)
	//clears intervals and timeouts
	//starts the game by sending the user to the showQuestion function
	$(document).on("click", ".startGame", function() {
		clearTimeout(timeoutId);
		clearTimeout(answerTimeoutId);
		clearInterval(intervalId);
		$(".header").empty();
		$(".page-header").empty();
		$(".page-header").append("<small class=\"subhead\">Hamilton Trivia</small>")
		$(".timerSection").html("15");
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
		additionalInfo = "";
		showQuestion(); 
	});



	function showQuestion() {
		//empties out divs
		$(".startSection").empty();
		$(".questionSection").empty();
		$(".choicesSection").empty();

		//gets next question from the array and stores it as a variable
		currentQuestion = questionArray[counter];

		//sends the question text to the DOM
		var currentQuestionText = $("<div class = \"questionText\">" + questionArray[counter].text + "</div>");
		$(".questionSection").append(currentQuestionText);

		//gets the array of possible answers for the current question
		var currentChoices = questionArray[counter].choices;

		//loops through the array of possible answers and displays each one to the DOM as a button
		for (var i = 0; i < currentChoices.length; i++) {
			var getChoicesSection = $(".choicesSection");
			var choiceListItem = $("<div><button class = \"answer\" value = " + i + " > <h3>" + currentChoices[i] + "</h3></button></div>");
			getChoicesSection.append(choiceListItem);
		}

		//gets the additional information piece for the current question
		additionalInfo = questionArray[counter].answerComment;

		//sets timeout for 15 second time limit to answer the question.
		timeoutId = setTimeout(questionTimer, 1000 * 15);

		//starts function to start the interval timer (countdown on the screen)
		start();
		//moved this from after the click handler

		//click handler for each answer button. when clicked, clears the timeout running against the question
		//clears the interval running against the question
		//sends user to the show answer function
		$(".answer").on("click", function() {
			userChoice = this.value;
			answeredQuestion = true;
			clearTimeout(timeoutId);
			clearInterval(intervalId);
			showAnswer();
			
		});

		//after show answer function runs, sends program back here
		//starts a timeout for 15 seconds on the question. This runs even if 


	}


	function showAnswer() {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		answerTimeoutId = setTimeout(answerTimer, 1000 * 6);
		$(".choicesSection").empty();
		$(".timerSection").empty();
		$(".timerDiv").empty();
		$(".choicesSection").append("<div class= \"moreInfo\">" + additionalInfo + "</div>");
		$(".choicesSection").append("<img class= \"picture\" src = \"assets/images/q" +(counter+1) + ".jpeg\">");
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




	//interval timer on question. 
	function questionTimer() {
  		clearInterval(intervalId)
  		$(".timerSection").removeClass("timerSectionRed");
  		showAnswer();
	}

	//The answer timer functtion drives the action of the game - moving from one question 
	//	to the next or ending the game.
	//
	//timer on the page with the answer. clears the interval and timeout from question page
	//increases the counter variable to advance to the next question
	//changes the answeredQuestion variable back to false to reset for next question
	//sets userChoice back to -1 to reset for the next question
	//checks the counter against the length of the question array. If there are more questions
	//		to display, sends program back to showQuestion function
	//		if no more questions, sends program to gameOver function
	function answerTimer () {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		counter++
		answeredQuestion = false;
		userChoice = -1;
  		if (counter < questionArray.length) {
  			showQuestion();
  		} else {
  			gameOver();

  		}
	}



	//starts timer on question page. empties existing data, resets timer to 15 seconds
	//displays it ot the screen, and starts count function at 1 second intervals
	function start() {
		$(".timerDiv").empty();
		timeQuestion = 15;
		$(".timerDiv").append("<div class = \"timerSection\"></div>");
	 	$(".timerSection").html("15");
	 	intervalId = setInterval(count, 1000);
	}


	//stops the interval function if called
	function stop() {
		timeQuestion = 0;
	  	clearInterval(intervalId);
	}



	//runs the interval on the question page. If the count falls to 5 seconds or below,
	//adds a class that allows the font to be styled red.
	function count() {
	 	timeQuestion--;
		$(".timerSection").html(timeQuestion);
	 	if (timeQuestion <= 5) {
	 		$(".timerSection").addClass("timerSectionRed");
	 	} else {
	 		$(".timerSection").removeClass("timerSectionRed");
	 	}

	}


	//when the game is over, wipes the existing info from the DOM and displays the scores and a replay button.
	function gameOver() {
		$(".questionSection").empty();
		$(".choicesSection").empty();
		$(".timerSection").empty();
		$(".startSection").append("<button class = \"startGame\">Play Again</button>");
		$(".choicesSection").append("<div class = \"scores\">Correct: " + scoreCorrect + " </div>");
		$(".choicesSection").append("<div class = \"scores\">Incorrect: " + scoreIncorrect + " </div>");
		$(".choicesSection").append("<div class = \"scores\">Unanswered: " + scoreUnanswered + " </div>");

	};
	
	




});
