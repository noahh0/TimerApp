function fixDisplay(input) {
  input.value = /.*[^\d].*/.test(input.value) ? "00" : 
                input.id !== "display-hours" && input.value > 59 ? "59" : 
                input.value.padStart(2, "0");
}