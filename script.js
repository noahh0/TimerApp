import { Timer } from "./timer.js";

/**
 * Adds a timer to the page
 */
function addTimer() {
  document.querySelector("#timers").appendChild(new Timer().timerDiv);
}

/**
 * Adds a timer to the page on load
 */
function main() {
  addTimer();
}

main();
