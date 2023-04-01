import { PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class Base {
    @Field(() => String)
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: string;

    @Field(() => Date)
    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created',
    })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'modified',
    })
    updatedAt: Date;

    @DeleteDateColumn()
    @Field(() => Date, { nullable: true })
    deletedAt: Date;
}
