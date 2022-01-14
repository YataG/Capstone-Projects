// variables//

var minutes = 0;
var seconds = 0;

function template() {
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}

function start() {
  minutes = 24;
  seconds = 59;

  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  function minutesTimer() {
    minutes = minutes - 1;
    document.getElementById('minutes').innerHTML = minutes;
  }
  function secondsTimer() {
    seconds = seconds - 1;
    document.getElementById('seconds').innerHTML = seconds;

    if (seconds <= 0) {
      if (minutes <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        document.getElementById('done').innerHTML =
          'Session Completed!! Take a Break!!';

        document.getElementById('done').classList.add('show_message');
      }
      seconds = 60;
    }
  }
}











  
