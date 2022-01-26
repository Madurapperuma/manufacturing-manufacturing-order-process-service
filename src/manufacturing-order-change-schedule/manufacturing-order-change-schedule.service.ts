import { Injectable } from "@nestjs/common";
import {PinoLogger} from 'nestjs-pino';

import { ManufacturingOrderJobService } from "./jobs/manufacturing-order-job.service";

import { ChangeScheduleArgs } from "./args/change-schedule.args";

@Injectable()
export class ManufacturingOrderChangeScheduleService {
    constructor(
        private jobService: ManufacturingOrderJobService,
        private logger: PinoLogger
    ) {
        this.logger.setContext('ChangeScheduleProcessor')
    };

    changeSchedule = async (userId: string, company: number, inputData: ChangeScheduleArgs[], currentScheduleNo: number,type:string) => {
        try {
            const job = await this.jobService.queueChangeSchedule(userId, company, inputData, currentScheduleNo,type);
            return {
                status: 'success'
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}