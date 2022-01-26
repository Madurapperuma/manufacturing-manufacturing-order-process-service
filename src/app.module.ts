import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { BullModule } from '@nestjs/bull';

import { join } from 'path';
import { PingController } from './rnd/ping/ping.controller';
import { RndModule } from './rnd/rnd.module';
import UtilModule from './util/util.module';
import EmployeeModule from './employee/employee.module';
import AuthModule from './auth/auth.module';
import ServiceConfigModule from './service-configuration/service-configuration.module';
import NotificationModule from './notification/notification.module';
import WebinarApi from './employee/webinar-api.service';
import { ManufacturingOrderChangeScheduleModule } from './manufacturing-order-change-schedule/manufacturing-order-change-schedule.module';

const dataSources = () => ({
  webinar: new WebinarApi(),
});

@Module({
  imports: [
    AuthModule,
    ServiceConfigModule,
    NotificationModule,
    LoggerModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          pinoHttp: config.get('logger.pinoHttp'),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.pg.hostname'),
          port: config.get('database.pg.port'),
          username: config.get('database.pg.username'),
          password: config.get('database.pg.password'),
          database: config.get('database.pg.database'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: config.get('database.pg.synchronize'),
        };
      },
    }),
    GraphQLFederationModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          dataSources,
          autoSchemaFile: true,
          playground: config.get('graphql.playground'),
          introspection: config.get('graphql.introspection'),
        };
      },
    }),
    // BullModule.forRootAsync({
    //   imports: [ServiceConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       redis: {
    //         // host: config.get('bull.redis.hostname'),
    //         host: 'localhost',
    //         // port: config.get('bull.redis.port'),
    //         port: 6380,
    //         // username: config.get('bull.redis.username'),
    //         // password: config.get('bull.redis.password'),
    //       },
    //     };
    //   },
    // }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    UtilModule,
    RndModule,
    ManufacturingOrderChangeScheduleModule
  ],
  controllers: [PingController],
  providers: [],
})
export default class AppModule {}
