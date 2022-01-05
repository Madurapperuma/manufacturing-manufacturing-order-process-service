import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateScheduleNo {
  @Field({ nullable: false })
  status: string;
}
