import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

import { ChangeScheduleArgs } from "../args/change-schedule.args";

@Injectable()
export class ManufacturingOrderJobService {
    constructor(
        @InjectQueue('change-schedule') private scheduleQueue: Queue
    ) {}

    queueChangeSchedule = async (userId: string, company: number, inputData: ChangeScheduleArgs[], currentScheduleNo: number) => {
        return await this.scheduleQueue.add('updat', {
            company,
            userId,
            currentScheduleNo,
            inputData
        });
    }
}