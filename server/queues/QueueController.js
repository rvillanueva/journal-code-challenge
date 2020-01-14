import redisClient from '../redis';
import Resque from 'node-resque';
import ResqueLogger from './ResqueLogger';

export default class QueueController {
  constructor(jobDefinitions) {
    this.connectionDetails = { redis: redisClient, namespace: 'resque' };

    this.jobDefinitions = jobDefinitions;

    this.queue = new Resque.Queue({connection: this.connectionDetails}, this.jobDefinitions);
    this.worker = new Resque.Worker({connection: this.connectionDetails, queues: '*'}, this.jobDefinitions);
    this.logger = new ResqueLogger();

    this.worker.on('job', (queueName, job) => this.logger.log('job', queueName, job));
    this.worker.on('success', (queueName, job) => this.logger.log('success', queueName, job));
    this.worker.on('failure', (queueName, job, e) => console.error(`Job failure (${queueName}) ${JSON.stringify(job)} >>`, e));
    this.worker.on('reEnqueue', (queueName, job) => this.logger.log('reEnqueue', queueName, job));
    this.worker.on('cleaning_worker', clearedWorker => console.log(`cleaning old worker ${clearedWorker}`));
    this.worker.on('error', err => console.error(err));
    this.queue.on('error', err => console.error(err));
  }
  async start() {
    await this.worker.connect();
    await this.queue.connect();
    // TODO build reconnect logic
    try {
      await this.queue.cleanOldWorkers(1000 * 60 * 10); // 10 minutes
    } catch(err) {
      console.error(err);
    }
    this.worker.start();
  }
  async push(queueName, jobName, options) {
    try {
      const stringified = JSON.stringify(options);
      return this.queue.enqueue(queueName, jobName, [stringified]);
    } catch(e) {
      console.error(e);
    }
  }
}
