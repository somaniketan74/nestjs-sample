import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonContact } from './person-contacts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Person, PersonContact])],
    providers: [PersonResolver, PersonService],
    exports: [PersonService],
})
export class PersonModule {}
