
class Counter {
  constructor(timeLeft, counter, timer, handleTimesUp) {
    this._timeLeft = timeLeft;
    this._counter = counter;
    this._timer = timer;
    this._handleTimesUp = handleTimesUp;
  }

  start() {
    this._timer.innerText = (this._timeLeft - this._counter);

    const handleCountDown = () => {
      if (this._counter === 5) {
        this._handleTimesUp();
      } else {
        this.keepCounting();
      }
    }

    this.countDown = setInterval(handleCountDown, 1000);
  }

  keepCounting() {
    this._counter += 1;
    this._timer.innerText = (this._timeLeft - this._counter);
  }

  reset(time = 0) {
    this._counter = time;
  }

  clear() {
    clearInterval(this.countDown);
  }
}
