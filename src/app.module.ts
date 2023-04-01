import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { join } from 'path';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person/person.entity';
import { PersonContact } from './person/person-contacts.entity';
import { DateResolver } from 'graphql-scalars';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        WinstonModule.forRoot({
            // options
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.printf((info) => {
                    return JSON.stringify(info);
                }),
            ),

            transports: [
                new winston.transports.File({ dirname: 'log', filename: 'error.log', level: 'error' }),
                new winston.transports.File({ dirname: 'log', filename: 'app.log' }),
            ],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                database: configService.get('DB_NAME'),
                entities: [Person, PersonContact],
                logging: true,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                ],
            },
            resolvers: {
                Date: DateResolver,
            },
            context: ({ req }) => {
                return { request: req };
            },
        }),
        PersonModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
