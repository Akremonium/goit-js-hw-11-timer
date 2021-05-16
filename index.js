class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate.getTime();
    this.selector = selector;

    this.refs = {
      timer: document.querySelector(`${selector}`),
      days: document.querySelector(`${selector} [data-value="days"]`),
      hours: document.querySelector(`${selector} [data-value="hours"]`),
      minutes: document.querySelector(`${selector} [data-value="mins"]`),
      seconds: document.querySelector(`${selector} [data-value="secs"]`),
    };
  }

  getTimeComponents(time) {
    const days = String(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  setTimeComponents({ days, hours, mins, secs }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.minutes.textContent = mins;
    this.refs.seconds.textContent = secs;
  }

  begin() {
    setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      this.setTimeComponents(this.getTimeComponents(deltaTime));
    }, 1000);
  }
}

const countdownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021"),
});

countdownTimer.begin();
