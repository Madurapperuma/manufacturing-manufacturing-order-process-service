import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import CacheService from './cache.service';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from './http.interface';
import * as https from 'https';

@Injectable()
export default class HttpClientService implements HttpClient {
  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  constructor(
    public http?: HttpService,
    public cacheService?: CacheService,
    @InjectPinoLogger() public logger?: PinoLogger,
  ) {}

  async get(
    url: string,
    cachettl?: number,
    config?: AxiosRequestConfig,
    httpsTlsIgnore?: boolean,
  ): Promise<any> {
    if (httpsTlsIgnore) {
      this.http.axiosRef.defaults.httpsAgent = this.httpsAgent;
    }
    if (!cachettl) {
      console.log('cache absent. calling endpoint');
      if (!this.http) {
        console.log('http is null');
      }
      const apiAttendeesObs = this.http.get(url, config);
      const apiResponse = (await firstValueFrom(apiAttendeesObs)).data;
      return apiResponse;
    }
    let response = JSON.parse(await this.cacheService.readFromCache(url));
    if (!response) {
      this.logger.debug(`cache missed for ${url}`);
      const attendeesObs = this.http.get(url, config);
      response = (await firstValueFrom(attendeesObs)).data;
      await this.cacheService.addStringToCache(
        url,
        JSON.stringify(response),
        cachettl,
      );
      this.logger.debug(`cache updated for ${url}`);
    } else {
      this.logger.debug(`cache found for ${url}`);
    }
    return response;
  }

  async post(url: string, data?: any, config?: any) {
    await firstValueFrom(this.http.post(url, data, config).pipe(map((res) => {
      return res.data;
    })))
  }

}
