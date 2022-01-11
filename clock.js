// variables//

var minutes = 25;
var seconds = 0;

function template() {
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}

function start() {
  let btn = localStorage.getItem('btn');

  if (btn === 'focus') {
    mins = +localStorage.getItem('focusTime') || 1;
  } else {
    mins = +localStorage.getItem('breakTime') || 1;
  }
  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = 'scale(0)';
  resetBtn.style.transform = 'scale(1)';
  circle.style.transition = '0.5s';
  sessionText.style.opacity = '1';
  paused = false;

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

const timer = document.getElementsByClassName('clock');

const mins = document.getElementsByClassName('mins');
const secs = document.getElementsByClassName('secs');

const startBtn = document.getElementsByClassName('start');
const sessionText = document.getElementsByClassName('session');

localStorage.setItem('btn', 'focus');

startBtn.addEventListener('click', () => {
  let btn = localStorage.getItem('btn');

  if (btn === 'focus') {
    mins = +localStorage.getItem('focusTime') || 1;
  } else {
    mins = +localStorage.getItem('breakTime') || 1;
  }

  const seconds = mins * 60;
  const totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = 'scale(0)';
  // pauseBtn.style.transform = 'scale(1)';
  resetBtn.style.transform = 'scale(1)';
  circle.style.transition = '0.5s';
  sessionText.style.opacity = '1';
  paused = false;
});

function decremenT() {
  mins.textContent = Math.floor(seconds / 60);
  secs.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains('danger')) {
    circle.classList.remove('danger');
  }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout('decremenT()', 1000);
    if (seconds < 10) {
      circle.classList.add('danger');
    }
  } else {
    mins = 0;
    seconds = 0;

    let btn = localStorage.getItem('submit');

    if (btn === 'focus') {
      sessionText.textContent = '😌 Break';
      startBtn.textContent = ' ';
      startBtn.classList.add('break');
      localStorage.setItem('submit', 'break');
    } else {
      startBtn.classList.remove('break');
      startBtn.textContent = ' ';
      localStorage.setItem('submit', 'focus');
      sessionText.textContent = '🤓 Focus';
    }
    startBtn.style.transform = 'scale(1)';
  }
}
//progress//
const circle = document.getElementById('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

const focusTimeInput = document.getElementById('focusTime');
const breakTimeInput = document.getElementById('breakTime');
const resetBtn = document.getElementsByClassName('reset btn');

focusTimeInput.value = localStorage.getItem('focusTime');
breakTimeInput.value = localStorage.getItem('breakTime');

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('focusTime', focusTimeInput.value);
  localStorage.setItem('breakTime', breakTimeInput.value);
});

document.getElementsByClassName('reset btn').addEventListener('click', () => {
  paused = false;
  startBtn.style.transform = 'scale(1)';
  resetBtn.style.transform = 'scale(0)';
  clearTimeout(initial);
  setProgress(0);
  mins.textContent = 0;
  secs.textContent = 0;
});
