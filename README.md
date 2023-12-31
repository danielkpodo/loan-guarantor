# Loan Guarantor Application

A loan guarantor application where a company agent logs in and distribute loans to customers

## Technology Used

- Next.js 13
- Next Auth
- Zod for schema validation
- Tailwindcss & Shadcn ui
- Prisma with Postgresql database

## Running the Project Locally

- Git clone the repository by running the following commands below at your preffered destination

```bash
git clone https://github.com/danielkpodo/loan-guarantor.git
```

- If you have setup ssh-keys on your github account run

```bash
git clone git@github.com:danielkpodo/loan-guarantor.git
```

- In the root of your application add the following `.env` environment variables

```bash
  DATABASE_URL="postgresql://< your postgres username>:<your postgres password>@localhost:5432/loanApp?schema=public"
  NEXTAUTH_SECRET=<any random base64 string>
  NEXTAUTH_URL=http://localhost:3000
  NODE_ENV=development
```

- To create a random base64 on a mac run the below command in your terminal
- Put the output as your `NEXTAUTH_URL` in the `.env`

```bash
  openssl rand -base64 32
```

- In the root of your application run the below command to install project dependencies

```bash
  npm install or yarn install
```

- Next, run the below command in your project terminal to migrate the prisma models in `prisma/schema.prisma` to populate your database

```
  npx prisma migrate dev --name init
```

- Now run the project by running

```
 npm run dev
```

- To build the project and enjoy lightning fast speed run the command below

```bash
    npm run build
```

- Next run `npm run start` after the build is successful and complete

- Your project should now start on a given port. You should see this in your terminal

## Creating a Test User to Login

- Install the extension `REST client` in vscode or use postman to create a test user as shown below
- Use the created password to login into the application portal

```bash
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "email": "someone@example.com",
  "password": "randompasscode"
}

```
