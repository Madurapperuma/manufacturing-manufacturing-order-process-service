import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HttpClientService from 'src/util/http-client.service';
import Employee from './type/employee.type';
import EmployeeEntity from './entity/employee.entity';
import WebinarApi from './webinar-api.service';
import EmployeeCreateInput from './type/employee-create.input.type';

@Injectable()
export default class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private _employeeRepository: Repository<EmployeeEntity>,
    private _webinarApi: WebinarApi,
    private _httpClient: HttpClientService,
  ) {}

  async findAllAttendees() {
    const attendees = await this._webinarApi.getAttendees();
    return attendees;
  }

  async findAllAttendeesHttp() {
    const attendees = await this._httpClient.get(
      'https://demo4689628.mockable.io/employees',
      10,
    );
    return attendees;
  }

  async findAll(): Promise<Employee[]> {
    const employees: EmployeeEntity[] = await this._employeeRepository.find();
    return employees;
  }

  async findOne(id: string, reqKeys): Promise<Employee> {
    type T = keyof EmployeeEntity;
    const fields: T[] = [];

    reqKeys.forEach((field) => {
      fields.push(field);
    });

    const employee: Employee = await this._employeeRepository.findOne({
      select: fields,
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`No record found for id ${id}`);
    }
    return employee;
  }

  async create(employee: EmployeeCreateInput): Promise<Employee> {
    const emp = this._employeeRepository.create(employee);
    return this._employeeRepository.save(emp);
  }

  async forProject(id: string) {
    const employees: Employee[] = await this._employeeRepository.find({
      projectId: id,
    });
    return employees;
  }

  async forLocation(id: string) {
    const employees: Employee[] = await this._employeeRepository.find({
      locationId: id,
    });
    return employees;
  }
}
