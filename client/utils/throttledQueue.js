import moment from 'moment';

export class ThrottledQueue {
  constructor(delaySeconds) {
    this.delaySeconds = delaySeconds;
    this.queue = [];
    this.lastRunAt = null;
    this.isRunning = false;
    this.timer = null;
    this.attempts = 0;
  }
  async push(cb) {
    if(!this.isRunning) {
      this.queue = [cb];
      if(!this.timer) this.setTimer();
    } else {
      this.queue.push(cb);
    }
  }
  pop() {
    this.queue = this.queue.slice(1);
  }
  getSecondsSinceLastRun() {
    if(!this.lastRunAt) return 9999999999;
    return this.lastRunAt.diff(moment(), 'seconds');
  }
  setTimer() {
    if(!this.timer) {
      this.timer = setTimeout(async() => {
        try {
          this.isRunning = true;
          if(this.queue.length > 0) {
            await this.queue[0]();
            this.pop();
          }
          this.clearTimer();
        } catch(err) {
          console.error(err);
          this.addAttempt();
          this.clearTimer();
          if(this.attempts > 3) {
            this.pop();
          }
        }
        this.isRunning = false;
        if(this.queue.length > 0) {
          this.setTimer();
        }
      }, Math.ceil(this.delaySeconds - this.getSecondsSinceLastRun(), 0));
    }
  }
  addAttempt() {
    this.attempts += 1;
  }
  resetAttempts() {
    this.attempts = 0;
  }
  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }
}
