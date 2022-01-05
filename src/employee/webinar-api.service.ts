import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';

@Injectable()
export default class WebinarApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://demo4689628.mockable.io';
  }

  async getAttendees() {
    const response = await this.get('/employees', {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      per_page: 10,
    });

    return response;
  }
}
