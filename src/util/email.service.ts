import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import CacheService from './cache.service';
import { Email } from './dto/email.dto';
import HttpClientService from './http-client.service';

@Injectable()
export default class EmailService extends HttpClientService {
  httpsAgent: any;
  baseUrl: string;

  constructor(
    _configuration: ConfigService,
    public http?: HttpService,
    public cacheService?: CacheService,
    @InjectPinoLogger() public logger?: PinoLogger,
  ) {
    super(http, cacheService, logger);
    this.baseUrl = _configuration.get('shared-services.email') || 'https://gateway-aws.dev.brandixlk.org/function/brandix-email-service.utility/email/send';
  }

  async send(email: Email): Promise<any> {
    this.logger.info(`calling email ${this.baseUrl}`);

    if (!email.to || !email.template) {
      this.logger.error(
        `email send aborted: to: ${email.to}, template: ${email.template}`,
      );
      return;
    }

    try {
      return super.post(this.baseUrl, email, {});
    } catch (error) {
      this.logger.error(`email send failed ${error}`);
    }
  }
}
