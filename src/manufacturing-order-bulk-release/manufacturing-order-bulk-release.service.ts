import { Injectable } from "@nestjs/common";
import {PinoLogger} from 'nestjs-pino';

import { ManufacturingOrderJobService } from "./jobs/manufacturing-order-job.service";

import { BulkReleaseArgs } from "./args/bulk-release-schedules.args";

@Injectable()
export class ManufacturingOrderBulkReleaseService {
    constructor(
        private jobService: ManufacturingOrderJobService,
        private logger: PinoLogger
    ) {
        this.logger.setContext('ChangeScheduleProcessor')
    };

    bulkRelease = async (userId: string, facility: string, scheduleNumbers: number[]) => {
        try {
           await this.jobService.bulkRelease(userId, facility, scheduleNumbers);
           return {
                status: 'success'
            }
        } catch (error) {
            throw new Error();
        }
    }
}