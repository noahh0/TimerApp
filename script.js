/**
 * Fixes the display of an input to maintain a valid time format
 * @param {HTMLElement} input - The HTML input calling the function
 */
function fixDisplay(input) {
  input.value = /.*[^\d].*/.test(input.value)
    ? "00"
    : input.id !== "display-hours" && input.value > 59
    ? "59"
    : input.value.padStart(2, "0");
}

function main() {
  document
    .querySelectorAll(".display")
    .forEach(
      (input) => (input.value = input.id == "display-minutes" ? "05" : "00")
    );
}

main();
