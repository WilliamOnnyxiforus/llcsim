## Getting Started

First, run the docker:

```bash
docker-compose up -d
```

How to access the mysql:

```bash
mysql -h 127.0.0.1 -P 3306 -u myuser -p mypassword
```

Knex commands:
Please run it in the root

```bash
# To make a new migrations file
npx knex migrate:make create_users_table

# To migrate
npx knex migrate:latest

# To make a new seeds file
npx knex seed:make seed_users

# To run the seeds
npx knex seed:run

#To roll back the migration
npx knex migrate:rollback
```