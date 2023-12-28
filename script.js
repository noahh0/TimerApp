let currentTimer;
let currentAlarm;

const displays = document.querySelectorAll(".display");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const clearButton = document.querySelector("#clear");

const alarmAudio = new Audio("alarm.mp3"); // TODO: fix background audio

/**
 * Fixes the display of an input to maintain a valid time format
 * @param {HTMLElement} input - The HTML input calling the function
 */
function fixDisplay(display) {
  display.value = /.*[^\d].*/.test(display.value)
    ? "00"
    : display.id !== "display-hours" && display.value > 59
    ? "59"
    : display.value.padStart(2, "0");
}

/**
 * Decrements the time on the display by one second
 * Stops the timer and plays an alarm at 00:00:00
 */
function decrementTimer() {
  displays[2].value =
    displays[2].value === "00"
      ? "59"
      : String(displays[2].value - 1).padStart(2, "0");
  displays[1].value =
    displays[2].value === "59"
      ? displays[1].value === "00"
        ? "59"
        : String(displays[1].value - 1).padStart(2, "0")
      : displays[1].value;
  displays[0].value =
    displays[1].value === "59" && displays[2].value === "59"
      ? String(displays[0].value - 1).padStart(2, "0")
      : displays[0].value;
  if (
    displays[0].value === "00" &&
    displays[1].value === "00" &&
    displays[2].value === "00"
  ) {
    timerAlert();
  }
}

/**
 * Pauses the timer countdown and allows inputs to be edited
 * Pauses the alert noise if it is playing
 */
function pauseTimer() {
  clearInterval(currentTimer);
  clearInterval(currentAlarm);
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  displays.forEach((display) => display.removeAttribute("readonly"));
  startButton.removeAttribute("disabled");
}

/**
 * Pauses the timer and plays an alert noise
 */
function timerAlert() {
  pauseTimer();
  alarmAudio.play();
  currentAlarm = setInterval(() => alarmAudio.play(), 5000);
}

/**
 * Starts the timer countdown and prevents inputs from being edited
 */
function startTimer() {
  displays.forEach((display) => display.setAttribute("readonly", "readonly"));
  startButton.setAttribute("disabled", "disabled");
  currentTimer = setInterval(() => decrementTimer(), 1000);
  if (
    displays[0].value === "00" &&
    displays[1].value === "00" &&
    displays[2].value === "00"
  ) {
    timerAlert();
  }
}

/**
 * Pauses the timer and resets the display to 00:05:00
 */
function clearDisplay() {
  pauseTimer();
  displays.forEach(
    (display) => (display.value = display.id == "display-minutes" ? "05" : "00")
  );
}

function main() {
  clearDisplay();
}

main();
