import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import CacheService from './cache.service';
import { Notification, NotificationRoot } from './dto/notification.dto';
import HttpClientService from './http-client.service';

@Injectable()
export default class NotificationService extends HttpClientService {
  httpsAgent: any;
  baseUrl: string;
  apiKey: string;

  constructor(
    private _configuration: ConfigService,
    public http?: HttpService,
    public cacheService?: CacheService,
    @InjectPinoLogger() public _logger?: PinoLogger,
  ) {
    super(http, cacheService, _logger);
    this.baseUrl = _configuration.get('shared-services.notification.url') || 'https://wd8zx31p05.execute-api.ap-southeast-1.amazonaws.com/rc/send';
    this.apiKey = _configuration.get('shared-services.notification.apiKey') || 'ZZG5Ke713o1VG04mGdTqG4zBJFLktG981stFinsA';
  }

  async notifyUser(userId: string, notification: Notification): Promise<any> {
    this._logger.info(`calling notification ${this.baseUrl}`);

    this._logger.debug(
      `calling notification ${this.baseUrl}`,
      ' UserId ',
      userId,
      ' Message:',
      JSON.stringify(notification),
    );

    const data = new NotificationRoot();
    data.userId = userId ? userId : 'schedule-release-dev';
    data.data = notification;

    try {
      await super.post(this.baseUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY':
            this.apiKey || 'ZZG5Ke713o1VG04mGdTqG4zBJFLktG981stFinsA',
        },
      });
      return true;
    } catch (error) {
      this._logger.error(`notification send failed ${error}`);
    }
  }
}
