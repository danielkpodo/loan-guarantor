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

- Next run the project by running

```
 npm run dev
```
