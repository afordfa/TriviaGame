
$(document).ready(function() {




	console.log("test");
	$(".startGame").on("click", function() {
		stop()
		$(".timerSection").html("00:10");
		console.log("click");
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
		2,
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

	console.log(questionArray);
	console.log(questionArray[0].text);


	var counter = 0
	showQuestion(); 
	function showQuestion() {
		var currentQuestion = $("<div class = \"questionText\">" + questionArray[counter].text + "</div>");
		$(".questionSection").append(currentQuestion);
		var currentChoices = questionArray[counter].choices;
		for (var i = 0; i < currentChoices.length; i++) {
			var getChoicesSection = $(".choicesSection");
			var choiceListItem = $("<div class = \"answer\">" + currentChoices[i] + "</div>");
			getChoicesSection.append(choiceListItem)
			console.log(currentChoices[i])
			
		}



		var currentChoices = questionArray[counter].choices;
		console.log(currentChoices);
		start()
		setTimeout(questionTimer, 1000 * 10);

	};


	

	function questionTimer() {
  		clearInterval(intervalId)
  		$(".timerSection").removeClass("timerSectionRed");
  		counter++;
  		if (counter < questionArray.length) {
  			showQuestion();
  		}
	}



	






	// **********************************************
//take out loop. start at 0 move display pieces to a function that takes a variable used to pull the array index
//when timeout ends, use funtion to reset to new question, increase counter by 1
//how to stop when questions are up? if statement before counter increment. if questions left, increment, otherwise, go to result page

	// **********************************************



	var time = 10;

	function reset() {

	  time = 10;

	  $(".timerSection").html("00:10");

	}

	function start() {
		time = 10;
	 	$(".timerSection").html("00:10");
	 	intervalId = setInterval(count, 1000);

	}

	function stop() {

	  clearInterval(intervalId);

	}


	function count() {
	 	time--;
		var converted = timeConverter(time);
		$(".timerSection").html(converted);
	 	if (time <= 5) {
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
	// **********************************************




	});
