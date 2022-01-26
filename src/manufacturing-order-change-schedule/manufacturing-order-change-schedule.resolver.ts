import { Resolver, Query, Args } from "@nestjs/graphql";

import { ManufacturingOrderChangeScheduleService } from './manufacturing-order-change-schedule.service';

import { ChangeSchedule } from './response/change-schedule.type';
import { UpdateScheduleNo } from './types/updateSheduleNo.type';
import { BulkRelease } from "./types/bulkRelease.type";

import { ChangeScheduleArgs } from "./args/change-schedule.args";
import { BulkReleaseArgs } from "./args/bulk-release-schedules.args";
import { MopArgs } from './args/mop.args';

@Resolver(() => ChangeSchedule)
export class ManufacturingOrderChangeScheduleResolver {
    constructor(private readonly changeScheduleService: ManufacturingOrderChangeScheduleService){}

   @Query(() => UpdateScheduleNo, { name: 'updateSheduleNo' })
   async updateScheduleNo(
       @Args('company') company: number,
       @Args('userId') userId: string,
       @Args('currentScheduleNo') currentScheduleNo: number,
       @Args('changedScheduleNo') changedScheduleNo: number,
       @Args({ name: 'inputData', type: () => [ChangeScheduleArgs], nullable: true }) inputData?: ChangeScheduleArgs[],
       @Args({ name: 'type', type: () => String, nullable: true }) type?: string,
       @Args({ name: 'selectedAll', type: () => Boolean, nullable: true }) selectedAll?: boolean,
       @Args({ name: 'queryData', type: () => MopArgs, nullable: true }) queryData?: MopArgs
   ): Promise<UpdateScheduleNo> {
  
    return await this.changeScheduleService.changeSchedule(userId, company, inputData, currentScheduleNo, changedScheduleNo, type, selectedAll, queryData);
   }

}