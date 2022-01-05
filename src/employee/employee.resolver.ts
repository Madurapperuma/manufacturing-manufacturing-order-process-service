import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Info,
} from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import EmployeeService from './employee.service';

import Employee from './type/employee.type';
import Attendees from './type/attendees.type';
import EmployeeCreateInput from './type/employee-create.input.type';
import { string } from 'joi';

@Resolver(() => Employee)
export default class EmployeeResolver {
  constructor(
    private _employeeService: EmployeeService,
    @InjectPinoLogger() private _logger: PinoLogger,
  ) {}

  @Query(() => String)
  version() {
    return 'version 0.0.91';
  }

  @Query(() => [Employee], { name: 'getAllEmployees' })
  async findAll() {
    this._logger.trace('find all request received');
    const employees: Employee[] = await this._employeeService.findAll();
    this._logger.trace(`employee record(s) ${employees.length} returned`);
    return employees;
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateInput) {
    return this._employeeService.create(employee);
  }

  @Query(() => Employee, { name: 'searchEmployee' })
  findOne(@Args('id') id: string, @Info() info) {
    const keys = info.fieldNodes[0].selectionSet.selections
      .filter((selection) => !selection.selectionSet)
      .map((item) => item.name.value);
    return this._employeeService.findOne(id, keys);
  }

  @Query(() => [Attendees])
  // eslint-disable-next-line class-methods-use-this
  findAllAttendeesDataSource(@Context('dataSources') { webinar }) {
    const attendees = webinar.getAttendees();
    return attendees;
  }

  @Query(() => [Attendees])
  async findAllAttendeesHttp() {
    const e = await this._employeeService.findAllAttendeesHttp();
    return e;
  }
}
