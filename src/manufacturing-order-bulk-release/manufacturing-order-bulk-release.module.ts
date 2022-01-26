import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";

import UtilModule from "../util/util.module";
import { ManufacturingOrderBulkReleaseResolver } from "./manufacturing-order-bulk-release.resolver";
import { ManufacturingOrderBulkReleaseService } from "./manufacturing-order-bulk-release.service";
import { ManufacturingOrderJobService } from "./jobs/manufacturing-order-job.service";
import { BulkReleaseProcessor } from "./jobs/manufacturing-order-bulk-release.processor";
import { MopsDataSource } from "./data-source/allMop.datasource";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'bulk-release'
        }),
        UtilModule
    ],
    providers: [
        ManufacturingOrderBulkReleaseResolver,
        ManufacturingOrderBulkReleaseService,
        ManufacturingOrderJobService,
        BulkReleaseProcessor,
        MopsDataSource
    ],
})

export class ManufacturingOrderBulkReleaseeModule {}