import { Resolver, Query, Args, Int } from "@nestjs/graphql";

import { ManufacturingOrderBulkReleaseService } from './manufacturing-order-bulk-release.service';

import { ChangeSchedule } from './response/change-schedule.type';
import { BulkRelease } from "./types/bulkRelease.type";

@Resolver(() => ChangeSchedule)
export class ManufacturingOrderBulkReleaseResolver {
    constructor(private readonly bulkReleaseService: ManufacturingOrderBulkReleaseService){}

   @Query(() => BulkRelease, { name: 'BulkRelease' })
   async bulkRelease(
       @Args('facility') facility: string,
       @Args('userId') userId: string,
       @Args({ name: 'scheduleNumbers', type: () => [Int], nullable: false }) scheduleNumbers: number[]
   ) {
        return await this.bulkReleaseService.bulkRelease(userId, facility, scheduleNumbers);
   }
}