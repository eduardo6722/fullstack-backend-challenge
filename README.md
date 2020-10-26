## Description

[Challenge](https://github.com/t10d/fullstack-assessment) T10 Full-stack Engineer Challenge.

## Installation

```bash
$ yarn | npm install
```

## Running the app

### With Docker

```bash
$ cd compose && docker-compose up --build
```

### Local (PostgreSQL needed)

```bash
# development
$ yarn start | npm run start

# watch mode
$ yarn start:dev | npm run start:dev
```

## Routes

### Chart

- **`POST /chart`**

```json
{
  "firstName": "Eduardo",
  "lastName": "Freitas",
  "color": "#00b8e2",
  "participation": 50
}
```

- **`GET /chart`**:

```json
[
  {
    "firstName": "Eduardo",
    "lastName": "Freitas",
    "color": "#00b8e2",
    "participation": 50
  }
]
```

- **`PUT /chart/:id`**

```json
{
  "firstName": "Eduardo G.",
  "lastName": "Freitas",
  "color": "#00b8e2",
  "participation": 60
}
```

- **`DELETE /chart/:id`**

### User

- **`POST /auth/signin`**

```json
{
  "email": "example@mail.com",
  "password: "123456"
}
```

- **`POST /auth/signup`**

```json
{
  "email": "example@mail.com",
  "password: "123456"
}
```
