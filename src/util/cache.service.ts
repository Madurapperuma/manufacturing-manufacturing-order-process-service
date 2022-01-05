import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { catchError } from 'rxjs';

@Injectable()
export default class CacheService {
  constructor(@InjectRedis() private _redis: Redis) {}

  async addStringToCache(key: string, data: string, ttl: number) {
    try {
      if ((await this._redis.ping()) !== 'PONG') {
        throw new InternalServerErrorException('cannot connect to redis');
      }
    } catch (error) {
      console.log('===================,', error)
      throw new Error(error);
    }

    if (ttl) {
      await this._redis.set(key, data, 'EX', ttl);
    } else {
      await this._redis.set(key, data);
    }
  }

  async readFromCache(key: string) {
    try {
      if ((await this._redis.ping()) !== 'PONG') {
        throw new InternalServerErrorException('cannot connect to redis');
      }
    } catch (error) {
      console.log('===================,', error)
      throw new Error(error);
    }
    const cachedResponse = await this._redis.get(key);
    return cachedResponse;
  }
}
