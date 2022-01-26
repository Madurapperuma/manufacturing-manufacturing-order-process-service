import { Resolver, Query, Args } from "@nestjs/graphql";

import { ManufacturingOrderChangeScheduleService } from './manufacturing-order-change-schedule.service';

import { ChangeSchedule } from './response/change-schedule.type';
import { UpdateScheduleNo } from './types/updateSheduleNo.type';

import { ChangeScheduleArgs } from "./args/change-schedule.args";

@Resolver(() => ChangeSchedule)
export class ManufacturingOrderChangeScheduleResolver {
    constructor(private readonly changeScheduleService: ManufacturingOrderChangeScheduleService){}

   @Query(() => UpdateScheduleNo, { name: 'updateSheduleNo' })
   async updateScheduleNo(
       @Args('company') company: number,
       @Args('userId') userId: string,
       @Args('currentScheduleNo') currentScheduleNo: number,
       @Args({ name: 'inputData', type: () => [ChangeScheduleArgs] }) inputData: ChangeScheduleArgs[],
       @Args({ name: 'type', type: () => String, nullable: true }) type?: string,
   ): Promise<UpdateScheduleNo> {
  
    return await this.changeScheduleService.changeSchedule(userId, company, inputData, currentScheduleNo,type);
   }
}