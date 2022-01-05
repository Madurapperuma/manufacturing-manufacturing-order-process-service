import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Attendees {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  gender: string;

  @Field()
  lastIpaddress: string;

  @Field()
  currency: string;

  @Field()
  creditcardType: string;

  @Field()
  creditcardNumber: string;
}
