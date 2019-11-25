# Tech Assessment: NS8-Api

## Setup

### Docker

---

#### Build the docker image

With docker:

```sh
docker build -t ns8-api .
```

Or with npm helper script:

```sh
npm run docker:build
```

### Node

---

Install node packages.

```sh
npm install
```

### Swagger/Open API

---

Generate API documentation.

### Generate routes to `src/routes`

```sh
npm run build:routes
```

### Generate Swagger config

```sh
npm run build:swagger
```

## Running the server

### Spin up the docker containers

---

With `docker-compose`:

```sh
docker-compose up -d
```

Or with npm helper script:

```sh
npm run docker:up
```

## Swagger/Open API

API docs can be found at: `http://localhost:9002/`

Makes use of [tsoa](https://github.com/lukeautry/tsoa) to generate swagger docs. tsoa uses annotations to provide API metadata.

### generate swagger.json

`tsoa swagger`

### generate routes

`tsoa routes`

## Future considerations

authentication

different environments

testing

build optimization

for local dev initialize test db

try an ORM with annotations

better logging

userIds

monngoDB?

make tests more robust

error handeling response codes

TODO:

- make union type for IEvent & Document
- take a look at anys
