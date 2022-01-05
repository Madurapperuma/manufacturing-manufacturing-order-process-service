import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangeScheduleArgs {
    @Field({nullable: false})
    company: number;

    @Field({nullable: false})
    plannedOrder: number;

    @Field({nullable: false})
    scheduleNo: number;

    @Field({nullable: true})
    status: number;
}

