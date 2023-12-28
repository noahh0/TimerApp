import { Timer } from "./timer.js";

/**
 * Adds a timer to the page
 */
function addTimer() {
  document.querySelector("#timers").appendChild(new Timer().timerDiv);
}

/**
 * Adds a timer to the page on load
 * Assigns a listener to the add timer button
 */
function main() {
  addTimer();
  document
    .querySelector("#add-timer-button")
    .addEventListener("click", addTimer);
}

main();
