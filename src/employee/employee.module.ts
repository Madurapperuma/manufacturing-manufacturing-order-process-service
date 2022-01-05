import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UtilModule from '../util/util.module';
import EmployeeService from './employee.service';
import EmployeeResolver from './employee.resolver';

import Employee from './entity/employee.entity';

import WebinarApi from './webinar-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), UtilModule],
  providers: [EmployeeService, EmployeeResolver, WebinarApi],
})
export default class EmployeeModule {}
