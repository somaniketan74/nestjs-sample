import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { GENDER } from '../common/constants';
import { DateResolver } from 'graphql-scalars';
import { PersonContact } from './person-contacts.entity';

@Entity()
@ObjectType()
export class Person extends Base {
    @Field(() => String)
    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Field(() => String)
    @Column({ name: 'surname', type: 'varchar' })
    surname: string;

    @Field(() => Number, { nullable: true })
    @Column({ name: 'age', type: 'int', nullable: true })
    age: number;

    @Field(() => GENDER, { nullable: true })
    @Column({
        name: 'gender',
        type: 'enum',
        enum: ['male', 'female'],
        nullable: true,
    })
    gender: string;

    @Field(() => DateResolver, { nullable: true })
    @Column({ name: 'date', type: 'date', nullable: true })
    date: Date;

    @Field(() => String, { nullable: true })
    @Column({ name: 'phone', type: 'varchar', nullable: true })
    phone: string;

    @Field(() => String, { nullable: true })
    @Column({ name: 'email', type: 'varchar', unique: true })
    email: string;

    @Field(() => [PersonContact], { nullable: true })
    @OneToMany(() => PersonContact, (personContact) => personContact.person, {
        nullable: true,
    })
    contacts: PersonContact[];
}
