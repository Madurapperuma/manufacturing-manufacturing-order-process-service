import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BulkReleaseArgs {
    @Field({nullable: false})
    scheduleNo: number[];
}

