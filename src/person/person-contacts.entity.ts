import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from './person.entity';

@Entity()
@ObjectType()
export class PersonContact extends Base {
    @ManyToOne(() => Person, { onDelete: 'CASCADE' })
    @JoinColumn()
    person: Person;

    @Field(() => Person, { nullable: true })
    @ManyToOne(() => Person, (person) => person.contacts, { onDelete: 'CASCADE' })
    @JoinColumn()
    contact: Person;
}
