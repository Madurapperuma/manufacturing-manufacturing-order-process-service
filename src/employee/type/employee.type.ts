import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export default class Employee {
  @Field({ nullable: true })
  federationId?: string;

  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  designation: string;

  @Field({ nullable: true })
  city: string;

  @Field()
  projectId: string;

  @Field()
  locationId: string;
}
