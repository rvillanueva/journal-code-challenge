import Redis from 'ioredis';
import config from '../config/environment';

const client = new Redis(config.redis.uri);

export default client;

export async function flushAll() {
  return client.flushall();
}

export class RedisStore {
  constructor(namespace) {
    this.namespace = namespace;
    this.client = client;
  }
  scopeHash(hash) {
    return `${this.namespace}__${hash}`;
  }
  hmset(hash, value) {
    return this.client.hmset(this.scopeHash(hash), value);
  }
  hgetall(hash) {
    return this.client.hgetall(this.scopeHash(hash));
  }
}
