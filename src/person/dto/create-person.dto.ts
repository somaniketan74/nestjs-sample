import { InputType, ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { GENDER } from '../../common/constants';
import { DateResolver } from 'graphql-scalars';
import { IsEmail } from 'class-validator';

registerEnumType(GENDER, { name: 'GENDER' });

@ArgsType()
@InputType()
export class CreatePersonInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    surname: string;

    @Field(() => Number, { nullable: true })
    age?: number;

    @Field(() => GENDER, { nullable: true })
    gender?: string;

    @Field(() => DateResolver, { nullable: true })
    date?: Date;

    @Field(() => String, { nullable: true })
    phone?: string;

    @IsEmail({}, { message: 'Email is not valid' })
    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => [String], { nullable: true })
    contacts?: [string];
}
