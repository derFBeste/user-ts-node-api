# Tech Assessment: NS8-Api

This implements a simple user api.

### It uses:

- Node.js as server.
- Typescript as a language.
- [Mongoose](https://mongoosejs.com/) as an ORM.
- Swagger/Open API for documents.
- [tsoa](https://github.com/lukeautry/tsoa) to generate endpoints and swagger docs.
- [Jest](https://jestjs.io/en/) for unit testing.
- Mongodb for a database.
- Docker for running mongo and the swagger server.

## Setup

### Node

---

Install node packages.

```sh
npm install
```

### Spin up the docker containers

This will run the db at `localhost:9002` and the swagger docs at `localhost:90001`.

---

With `docker-compose`:

```sh
docker-compose up -d
```

Or with npm helper script:

```sh
npm run docker:up
```

### Run the unit tests

The tests will seed the database with test data.

Note: The first time you run this on a fresh database sometimes you have to run it twice.

```sh
npm run test
```

### Run the dev server

This will serve from `localhost:9000`.

```sh
npm run start
```

or with the debug logs:

```sh
npm run start:debug
```

To run in watch and debug mode:

```sh
npm run start:watch
```

## Swagger/Open API

The routes will automatically build and run while in watch mode. To build them manually use the commands below. The swagger docs have to be built manually.

---

### Generates routes to `src/routes`:

```sh
npm run build:routes
```

### Generates Swagger config to `api/dist`:

```sh
npm run build:swagger
```

## Useful scripts

---

`npm run start` - starts the server  
`npm run start:watch` - starts the server for development with auto restart on save  
`npm run test:watch` - runs tests with auto restart on save  
`npm run docker:up` - runs the docker-compose.yaml, starts containers  
`npm run docker:stop` - stops the containers  
`npm run docker:clean` - removes the containers  
`npm run build:all` - builds routes, swagger api, and dist

## Future considerations

There are quite a few things to do. I think these are some of the most important:

- More robust testing. I only have I handful of test cases. Really just what I needed to develop with. There should be more tests such as for testing endpoints.

- I didn't setup logging other than using Node's built in debug. I good logging strategy is super useful probably using an additional library.

- Set up for different environments. It should be setup for a local, dev, and prod environments. Theses would require variables, different build scripts, and different logging.

- Using https and authentication. I had trouble with swagger since I'm not using SSL. The swagger UI url shows the endpoints but the "Try it out" doesn't work.

- Make endpoints more robust. Other than some validation I didn't do any error handling and didn't update response codes.

- Adding more endpoints. I pretty much just implemented what was in the requirements so there are just a handful of endpoints.

- With all of the data I just used simple strings. The API needs a good solution for things like users ids.

- Is MongoDB a good choice? If the data model is going to be more complex a relational db might be a good idea.
