
$(document).ready(function() {




	console.log("test");
	$(".startGame").on("click", function() {
		stop()
		$(".timerSection").html("00:05");
		console.log("click");
	});



			 start();


	var time = 15;

	function reset() {

	  time = 15;

	  $(".timerSection").html("00:15");

	}

	function start() {
	  intervalId = setInterval(count, 1000);
	}

	function stop() {

	  clearInterval(intervalId);

	}


	function count() {

	  time--;
	  var converted = timeConverter(time);
	  $(".timerSection").html(converted);

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




	// **********************************************
	// click handler for start game
	// **********************************************





	// **********************************************
	// click handler for start game
	// **********************************************


	});
