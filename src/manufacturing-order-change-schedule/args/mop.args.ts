import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MopArgs {
    @Field({nullable: false})
    facility: string;

    @Field({nullable: true})
    co: string;

    @Field({nullable: false})
    scheduleNo: number;

    @Field({nullable: true})
    style: string;
}

