import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { CreatePersonInput } from './dto/create-person.dto';
import { UpdatePersonInput } from './dto/update-person.dto';
import { ListPersonOutput } from './dto/list-person.dto';
import { Person } from './person.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Resolver()
export class PersonResolver {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly personService: PersonService,
    ) {}

    @Mutation(() => Person)
    async createPerson(@Args('createPerson') createPersonInput: CreatePersonInput): Promise<Person> {
        this.logger.info('creating person', { data: createPersonInput });
        return this.personService.createPerson(createPersonInput);
    }

    @Mutation(() => Person)
    async updatePerson(@Args('updatePerson') updatePersonInput: UpdatePersonInput): Promise<Person> {
        this.logger.info('updating person', { data: updatePersonInput });
        return this.personService.updatePerson(updatePersonInput);
    }

    @Mutation(() => String)
    async deletePerson(@Args('id', { type: () => String }) id: string): Promise<string> {
        this.logger.info('delete person', { data: id });
        return this.personService.deletePerson(id);
    }

    @Query(() => ListPersonOutput)
    async getPersonList(
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    ): Promise<ListPersonOutput> {
        this.logger.info('get person list', { data: { page, limit } });
        return this.personService.getPersonList(page, limit);
    }

    @Query(() => Person)
    async getPerson(@Args('id', { type: () => String }) id: string): Promise<Person> {
        this.logger.info('get person', { data: { id } });
        return this.personService.getPerson(id);
    }
}
