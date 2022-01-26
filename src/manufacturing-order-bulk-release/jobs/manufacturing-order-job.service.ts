import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

import { BulkReleaseArgs } from "../args/bulk-release-schedules.args";

@Injectable()
export class ManufacturingOrderJobService {
    constructor(
        @InjectQueue('bulk-release') private bulkQueue: Queue
    ) {}

    bulkRelease = async (userId: string, facility: string, scheduleNumbers: number[]) => {
        return await this.bulkQueue.add('updat', {
            userId,
            facility,
            scheduleNumbers
        })
    }
}