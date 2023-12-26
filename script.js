let currentTimer;
let displays = document.querySelectorAll(".display");
let startButton = document.querySelector("#start");
let pauseButton = document.querySelector("#pause");
let clearButton = document.querySelector("#clear");

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
 *
 */
function decrementTimer() {
  if (displays[2].value === "00") {
    if (displays[1].value === "00") {
      if (displays[0].value === "00") {
        timerAlert();
      } else {
        displays[0].value = String(displays[0].value - 1).padStart(2, "0");
        displays[1].value = "59";
        displays[2].value = "59";
      }
    } else {
      displays[1].value = String(displays[1].value - 1).padStart(2, "0");
      displays[2].value = "59";
    }
  } else {
    displays[2].value = String(displays[2].value - 1).padStart(2, "0");
  }
}

/**
 *
 */
function pauseTimer() {
  clearInterval(currentTimer);
  displays.forEach((display) => display.removeAttribute("readonly"));
  startButton.removeAttribute("disabled");
}

/**
 *
 */
function timerAlert() {
  pauseTimer();
  // play alert sound
}

/**
 *
 */
function startTimer() {
  displays.forEach((display) => display.setAttribute("readonly", "readonly"));
  startButton.setAttribute("disabled", "disabled");
  currentTimer = setInterval(() => decrementTimer(), 1000);
}

/**
 *
 */
function clearDisplay() {
  pauseTimer();
  displays.forEach(
    (input) => (input.value = input.id == "display-minutes" ? "05" : "00")
  );
}

function main() {
  clearDisplay();
}

main();
