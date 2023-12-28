export class Timer {
  /**
   * Constructs a new timer object
   */
  constructor() {
    this.timerDiv = this.createHTML();
    this.displays = Array.from(
      this.timerDiv.querySelectorAll(".timer-display")
    );
    this.startButton = this.timerDiv.querySelector(".start");
    this.pauseButton = this.timerDiv.querySelector(".pause");
    this.clearButton = this.timerDiv.querySelector(".clear");
    this.alarmAudio = new Audio("alarm.mp3");
    this.alarmInterval = 5000;
    this.currentTimer;
    this.currentAlarm;
    this.createListeners();
    this.clearDisplay();
  }

  /**
   * Creates a div to display the timer on the page
   * @returns {HTMLElement} - The div that was created
   */
  createHTML = () => {
    let div = document.createElement("div");
    div.classList.add("timer");
    div.innerHTML = `
      <div class="timer-displays">
        <input type="text" class="timer-display hours" maxLength="2" />
        <p>:</p>
        <input type="text" class="timer-display minutes" maxLength="2" />
        <p>:</p>
        <input type="text" class="timer-display seconds" maxLength="2" />
      </div>
      <div class="timer-controls">
        <button class="timer-control start">START</button>
        <button class="timer-control pause">PAUSE</button>
        <button class="timer-control clear">CLEAR</button>
      </div>
    `;
    return div;
  };

  /**
   * Creates event listeners for the timer
   */
  createListeners = () => {
    this.displays.forEach((display) => {
      display.addEventListener("change", () => this.fixDisplay(display));
    });
    this.startButton.addEventListener("click", this.startTimer);
    this.pauseButton.addEventListener("click", this.pauseTimer);
    this.clearButton.addEventListener("click", this.clearDisplay);
  };

  /**
   * Fixes the text in a display to maintain a valid time format
   * @param {HTMLElement} display - The display to be fixed
   */
  fixDisplay = (display) => {
    display.value = /.*[^\d].*/.test(display.value)
      ? "00"
      : display.classList.contains("hours") && display.value > 59
      ? "59"
      : display.value.padStart(2, "0");
  };

  /**
   * Pauses the timer and plays an alert noise
   */
  timerAlert = () => {
    this.pauseTimer();
    this.alarmAudio.play();
    this.currentAlarm = setInterval(
      () => this.alarmAudio.play(),
      this.alarmInterval
    );
  };

  /**
   * Decrements the time on the display by one second
   * Pauses the timer and plays an alarm at 00:00:00
   */
  decrementTimer = () => {
    this.displays[2].value =
      this.displays[2].value === "00"
        ? "59"
        : String(this.displays[2].value - 1).padStart(2, "0");
    this.displays[1].value =
      this.displays[2].value === "59"
        ? this.displays[1].value === "00"
          ? "59"
          : String(this.displays[1].value - 1).padStart(2, "0")
        : this.displays[1].value;
    this.displays[0].value =
      this.displays[1].value === "59" && this.displays[2].value === "59"
        ? String(this.displays[0].value - 1).padStart(2, "0")
        : this.displays[0].value;
    if (this.displays.every((display) => display.value === "00")) {
      this.timerAlert();
    }
  };

  /**
   * Starts the timer countdown and prevents inputs from being edited
   */
  startTimer = () => {
    this.displays.forEach((display) =>
      display.setAttribute("readonly", "readonly")
    );
    this.startButton.setAttribute("disabled", "disabled");
    this.currentTimer = setInterval(this.decrementTimer, 1000);
    if (
      this.displays[0].value === "00" &&
      this.displays[1].value === "00" &&
      this.displays[2].value === "00"
    ) {
      this.timerAlert();
    }
  };

  /**
   * Pauses the timer countdown and allows inputs to be edited
   * Pauses the alert noise if it is playing
   */
  pauseTimer = () => {
    clearInterval(this.currentTimer);
    clearInterval(this.currentAlarm);
    this.alarmAudio.pause();
    this.alarmAudio.currentTime = 0;
    this.displays.forEach((display) => display.removeAttribute("readonly"));
    this.startButton.removeAttribute("disabled");
  };

  /**
   * Pauses the timer and resets the display to 00:05:00
   */
  clearDisplay = () => {
    this.pauseTimer();
    this.displays.forEach(
      (display) =>
        (display.value = display.classList.contains("minutes") ? "05" : "00")
    );
  };
}
