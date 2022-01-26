import { RedisModule } from '@nestjs-modules/ioredis';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { M3ClientService } from './m3-client.service';
import ServiceConfigModule from '../service-configuration/service-configuration.module';
import CacheService from './cache.service';
import HttpClientService from './http-client.service';
import NotificationService from './notification.service';
import EmailService from './email.service';
import FileSerivce from './file.service';
import TemplateSerivce from './template.service';
import GraphqlClientService from './graphql.service';

@Module({
  imports: [
    HttpModule,
    RedisModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          url: config.get('database.redis.url'),
        },
      }),
    }),
  ],
  providers: [CacheService, HttpClientService, M3ClientService, NotificationService, EmailService, FileSerivce, TemplateSerivce, GraphqlClientService],
  exports: [HttpClientService, M3ClientService, CacheService, NotificationService, EmailService, FileSerivce, TemplateSerivce, GraphqlClientService],
})
export default class UtilModule {}
