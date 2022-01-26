import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BulkRelease {
  @Field({ nullable: false })
  status: string;
}
