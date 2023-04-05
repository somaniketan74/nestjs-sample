import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Person } from './person.entity';
import { PersonContact } from './person-contacts.entity';
import { CreatePersonInput } from './dto/create-person.dto';
import { UpdatePersonInput } from './dto/update-person.dto';
import { ListPersonOutput } from './dto/list-person.dto';

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        @InjectRepository(PersonContact)
        private readonly personContact: Repository<PersonContact>,
        private dataSource: DataSource,
    ) {}

    async createPerson(createPersonInput: CreatePersonInput): Promise<Person> {
        const person = new Person();
        for (const key in createPersonInput) {
            Object.assign(person, {
                [key]: createPersonInput[key],
            });
        }
        const personToSave = this.personRepository.create(person);
        await this.personRepository.save(personToSave);
        await this.createPersonContacts(personToSave, createPersonInput.contacts);
        return personToSave;
    }

    async createPersonContacts(person: Person, contacts: [string]) {
        await this.personContact
            .createQueryBuilder('personcontact')
            .delete()
            .from(PersonContact)
            .where('personId = :id', { id: person.id })
            .execute();
        for (const contact of contacts) {
            const newContact = new PersonContact();
            newContact.person = person;
            newContact.contact = await this.dataSource.getRepository(Person).findOne({ where: { id: contact } });
            await this.dataSource.getRepository(PersonContact).save(newContact);
        }
    }

    async updatePerson(updatePersonInput: UpdatePersonInput): Promise<Person> {
        const person = await this.personRepository.findOneBy({
            id: updatePersonInput.id,
        });
        if (!person) throw new Error('Person does not exiss');
        for (const key in updatePersonInput) {
            Object.assign(person, {
                [key]: updatePersonInput[key],
            });
        }
        delete person.contacts;
        const personToUpdate = await this.personRepository.save(person);
        if (Array.isArray(updatePersonInput.contacts)) {
            await this.createPersonContacts(personToUpdate, updatePersonInput.contacts);
        }
        return await this.personRepository
            .createQueryBuilder('person')
            .leftJoinAndSelect('person.contacts', 'contacts')
            .leftJoinAndSelect('contacts.contact', 'contactperson')
            .where('person.id = :id', { id: personToUpdate.id })
            .getOne();
    }

    async deletePerson(id: string): Promise<string> {
        const res = await this.personRepository.delete(id);
        if (!res) throw new Error('Person not found');

        return 'Record deleted successfully';
    }

    async getPersonList(page = 1, limit = 10): Promise<ListPersonOutput> {
        const skip = (page - 1) * limit;
        const [result, total] = await this.personRepository
            .createQueryBuilder('person')
            .leftJoinAndSelect('person.contacts', 'contacts')
            .leftJoinAndSelect('contacts.contact', 'contactperson')
            .take(limit)
            .skip(skip)
            .getManyAndCount();
        return {
            count: total,
            data: result || [],
        };
    }

    async getPerson(id: string): Promise<Person> {
        const person = await this.personRepository
            .createQueryBuilder('person')
            .leftJoinAndSelect('person.contacts', 'contacts')
            .leftJoinAndSelect('contacts.contact', 'contactperson')
            .where('person.id = :id', { id })
            .getOne();
        if (!person) throw new Error('Person does not exists');
        return person;
    }
}
