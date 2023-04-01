import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from '../person.entity';

@ObjectType()
export class ListPersonOutput {
    @Field(() => Number)
    count: number;

    @Field(() => [Person])
    data: Person[];
}
