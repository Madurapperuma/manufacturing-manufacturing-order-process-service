import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fetchConfig from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [fetchConfig],
    }),
  ],
})
export default class ServiceConfigModule {}
