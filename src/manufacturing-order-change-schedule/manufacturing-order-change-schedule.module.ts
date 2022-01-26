import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";

import UtilModule from "../util/util.module";
import { ManufacturingOrderChangeScheduleResolver } from "./manufacturing-order-change-schedule.resolver";
import { ManufacturingOrderChangeScheduleService } from "./manufacturing-order-change-schedule.service";
import { ManufacturingOrderJobService } from "./jobs/manufacturing-order-job.service";
import { ChangeScheduleProcessor } from "./jobs/manufacturing-order-change-schedule.processor";
import { MopsDataSource } from "./data-source/allMop.datasource";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'change-schedule'
        }),
        UtilModule
    ],
    providers: [
        ManufacturingOrderChangeScheduleResolver,
        ManufacturingOrderChangeScheduleService,
        ManufacturingOrderJobService,
        ChangeScheduleProcessor,
        MopsDataSource
    ],
})

export class ManufacturingOrderChangeScheduleModule {}