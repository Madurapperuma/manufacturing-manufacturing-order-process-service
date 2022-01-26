import { Injectable } from "@nestjs/common";
import {PinoLogger} from 'nestjs-pino';

import { ManufacturingOrderJobService } from "./jobs/manufacturing-order-job.service";

import { ChangeScheduleArgs } from "./args/change-schedule.args";
import { MopArgs } from "./args/mop.args";

@Injectable()
export class ManufacturingOrderChangeScheduleService {
    constructor(
        private jobService: ManufacturingOrderJobService,
        private logger: PinoLogger
    ) {
        this.logger.setContext('ChangeScheduleProcessor')
    };

    changeSchedule = async (userId: string, company: number, inputData: ChangeScheduleArgs[], currentScheduleNo: number, changedScheduleNo: number, type:string, selectedAll: boolean = false, queryData: MopArgs = null) => {
        try {
            await this.jobService.queueChangeSchedule(userId, company, inputData, currentScheduleNo, changedScheduleNo,type, selectedAll, queryData);
            return {
                status: 'success'
            }
        } catch (error) {
            throw new Error();
        }
    }
}