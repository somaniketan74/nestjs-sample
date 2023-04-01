import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { GENDER } from '../../common/constants';
import { DateResolver } from 'graphql-scalars';

registerEnumType(GENDER, { name: 'GENDER' });

@InputType()
export class UpdatePersonInput {
    @Field(() => String)
    id: string;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    surname?: string;

    @Field(() => Number, { nullable: true })
    age?: number;

    @Field(() => GENDER, { nullable: true })
    gender?: string;

    @Field(() => DateResolver, { nullable: true })
    date?: Date;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => [String], { nullable: true })
    contacts?: [string];
}
