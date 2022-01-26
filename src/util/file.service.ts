import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';

@Injectable()
export default class FileSerivce {
    constructor() {}

    read = (path: string) : Promise<string> => {
        return fs.readFile(path, 'utf-8');
    }
}