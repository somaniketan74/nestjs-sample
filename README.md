<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A sample test task which includes CRUD operation of person API's.</p>

## Description

This project provides the REST API we able to:
- Create a person
- Get a person data
- Modify a person
- Delete a person
- Get the list of all the stored people using pagination. The list must be ordered using
the email property.

## Language, Framework & Database

```bash
✅ NodeJs 18.15.0
✅ Fastify 9.3.12
✅ NestJs 9.3.0
✅ PostgreSQL 15.2
✅ GraphQL 16.6.0
```

## Prerequisite

```bash
- PostgreSQL 15.2
- NodeJs 18.15.0
```

## How to run project

```bash
1. Clone the project
2. Convert .env.example to .env file and define all the values of variables
3. Ensure postgres database is running
3. install dependency using "npm install"
4. run the commanda "npm run start"
```

## APIs

### 1. Create A Person

```
curl 'http://localhost:3001/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' --data-binary '{"query":"# Write your query or mutation here\nmutation{\n  createPerson(createPerson:{\n    name: \"ketan5\",\n    surname: \"somani5\",\n    age: 10,\n    gender: MALE,\n    date: \"1992-03-13\",\n    phone: \"+91-8438308022\",\n    email: \"fdfsfsfds\",\n    contacts: []\n  }){\n     id,\n     name,\n    surname,\n    age,\n    gender,\n    date,\n    phone,\n    email,\n    createdAt,\n    updatedAt,\n    contacts{\n      contact{\n        name\n      }\n    }\n  }\n}"}' --compressed
```

### 2. Get A Person Data

```
curl 'http://localhost:3001/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' --data-binary '{"query":"{\n  getPerson(id:\"3\"){\n    id,\n    name,\n    surname,\n    age,\n    gender,\n    date,\n    phone,\n    email,\n    contacts{\n        contact{\n          name\n        }\n      }\n  }\n}"}' --compressed
```

### 3. Get Person List

```
curl 'http://localhost:3001/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' --data-binary '{"query":"{\n  getPersonList(page:1, limit: 3){\n    data{\n      id,\n      name,\n      surname,\n      age,\n      gender,\n      date,\n      phone,\n      email,\n      contacts{\n        contact{\n          name\n        }\n      }\n    },\n    count\n  }\n}"}' --compressed
```

### 4. Update a Person

```
curl 'http://localhost:3001/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' --data-binary '{"query":"mutation{\n  updatePerson(updatePerson:{\n    id:\"32\",\n    name: \"Updated Ketan final\"\n  }){\n    id,\n    name,\n    surname,\n    contacts{\n      contact{\n        name\n      }\n    }\n  }\n}"}' --compressed
```

### 5. Delete a Person

```
curl 'http://localhost:3001/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' --data-binary '{"query":"mutation{\n  deletePerson(id:\"3\")\n}"}' --compressed
```

