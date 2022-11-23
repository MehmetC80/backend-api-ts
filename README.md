# Build a Backend API

- An example api with basic crud functionalities and a postgres database

## libraries

1. Express
2. Prisma
3. Jsonwebtoken
4. Validator
5. Bcryptjs

## Setup

1. Dependencies

```
$ npm i express dotenv validator bcrypt jsonwebtoken cors
```

2. Dev Dependencies

```
npm i -D typescript nodemon prisma @types/bcrypt @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/lodash @types/node @types/validator
```

3. Prisma init

```
npx prisma init
```

## Routes

```
http://localhost:3500/api/signup

```

```
http://localhost:3500/api/login

```

```
http://localhost:3500/api/logout

```

```
http://localhost:3500/api/post/create

```

```
http://localhost:3500/api/post/posts

```

## .env example

-

```

DATABASE_URL="postgresql://Your_Postgres_User_Name:Your_Postgres_User_Password@localhost:5432/Your_Database_Name"

JWT_SECRET="secet_password"

PORT=3500

```
