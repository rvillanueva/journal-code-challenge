import QueueController from './QueueController';
import {SYNC_JOB} from '../constants/jobTypes';

function transformArgs(func) {
  return function(stringifiedOptions) {
    const options = JSON.parse(stringifiedOptions);
    return func(options);
  };
}

const jobs = {
  /*[SYNC_JOB]: {
    perform: transformArgs(performSync)
  }*/
};

export const queues = new QueueController(jobs);
