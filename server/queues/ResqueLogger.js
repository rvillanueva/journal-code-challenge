export default class ResqueLogger {
  constructor() {
    this.timer;
    this.digest;
    this.digestedJobClasses = [];
    this.resetDigest();
  }
  addDigestedJobClass(jobClass) {
    this.digestedJobClasses.push(jobClass);
  }
  log(messageType, queueName, job, failureError) {
    if(this.digestedJobClasses.indexOf(job.class) > -1 && messageType !== 'failure') {
      return this.addToDigest(messageType, queueName, job);
    }
    switch (messageType) {
    case 'job':
      this.send(`Working job (${queueName})`, job);
      return;
    case 'success':
      this.send(`Job success (${queueName})`, job);
      return;
    case 'failure':
      this.sendError(`Job failure (${queueName}) ${JSON.stringify(job)} >>`, failureError);
      return;
    default:
      this.send(`${messageType} (${queueName})`, job);
      return;
    }
  }
  send(...rest) {
    console.log('[RESQUE]', ...rest);
  }
  sendError(message, err) {
    console.error(`[RESQUE] - ${message}`, err);
  }
  resetDigest() {
    this.digest = {
      byMessage: {}
    };
  }
  addToDigest(messageType, queueName, job) {
    this.digest.byMessage[messageType] = this.digest.byMessage[messageType] || {
      byJob: {}
    };
    const byJob = this.digest.byMessage[messageType].byJob;
    byJob[job.class] = byJob[job.class] || [];
    byJob[job.class].push(job);
    if(!this.timer) {
      this.timer = setTimeout(this.logDigest.bind(this), 5000);
    }
  }
  logDigest() {
    Object.keys(this.digest.byMessage).forEach(messageType => {
      const byJob = this.digest.byMessage[messageType].byJob;
      Object.keys(byJob).forEach(jobClass => {
        const jobs = byJob[jobClass];
        this.send(`${jobs.length} ${jobClass} ${messageType} message${jobs.length === 1 ? '' : 's'}.`);
      });
    });
    this.resetDigest();
    clearTimeout(this.timer);
    this.timer = undefined;
  }
}
