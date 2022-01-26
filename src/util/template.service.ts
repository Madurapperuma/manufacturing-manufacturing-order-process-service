import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as _ from 'lodash';
import FileSerivce from './file.service';

import { ScheduleContent } from './dto/template.dto';

@Injectable()
export default class TemplateSerivce {
  constructor(private fileService: FileSerivce) {}

  changeScheduleContent = async (data: any): Promise<string> => {
  
    const content = await this.fileService.read(
      path.resolve(
       `${__dirname}\\template\\mop-scheduling-and-release.html`,
      ),
    );
  
    return _.template(content)({ ...data });
  };
}
