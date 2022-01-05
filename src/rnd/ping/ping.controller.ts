import { Controller, Get, Param, Post } from '@nestjs/common';
import CacheService from '../../util/cache.service';

@Controller('ping')
export class PingController {
  constructor(private cacheService: CacheService) {}

  @Get()
  ping() {
    return {
      message: 'You have successfully reached openfaas hosted service',
    };
  }
  @Post('/cache/:key/:value')
  async cache(@Param('key') key: string, @Param('value') value: string) {
    console.log('about to save to cache');
    return await this.cacheService.addStringToCache(key, value, 10);
  }

  @Get('/cache/:key')
  async cacheRead(@Param('key') key: string) {
    let ret = await this.cacheService.readFromCache(key);
    if (!ret) {
      return 'key not found';
    } else {
      return ret;
    }
  }
}
