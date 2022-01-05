import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import CacheService from './cache.service';
import m3Api from './dto/m3api.dto';
import HttpClientService from './http-client.service';

@Injectable()
export class M3ClientService extends HttpClientService {
  httpsAgent: any;

  constructor(
    private _configuration: ConfigService,
    public http?: HttpService,
    public cacheService?: CacheService,
    @InjectPinoLogger() public logger?: PinoLogger,
  ) {
    super(http, cacheService, logger);
  }

  async callGet(m3api: m3Api): Promise<any> {
    const baseUrl: string = this._configuration.get('datasource.m3.rest.url');

    const auth = {
      username: this._configuration.get('datasource.m3.rest.username'),
      password: this._configuration.get('datasource.m3.rest.password'),
    };

    const url = new URL(baseUrl);
    const maxRecord = `maxrecs=${m3api.maxRecord}`;
    const pathParam = `${m3api.program}/${m3api.transaction};`;
    let urlParam = `${maxRecord};metadata=true;excludempty=false;cono=${m3api.company};divi=${m3api.division}`;

    if (m3api.output && m3api.output.length !== 0) {
      const outputFields = m3api.output.join();
      urlParam = urlParam.concat(';returncols='.concat(outputFields));
    }

    if (m3api.input && m3api.input.size !== 0) {
      m3api.input.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }

    const customPath = pathParam.concat(urlParam);
    url.pathname = url.pathname.concat(customPath);
    const m3url: string = url.toString();
    this.logger.info(`calling m3 url ${m3url}`);

    const response = await super.get(m3url, null, { auth }, true);
    this.logger.info(
      `m3 client response size ${response.results[0].records.length}`,
    );
    return response;
  }
}
