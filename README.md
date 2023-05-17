## Database Help

These are thhe commands to configure a local version of the database, including seeding the tables using Knex.

// Install PostgreSQL & Knex.
npm i pg knex

// Spin-up a Postgres Docker container using default values.
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

// Log into your Postgres container.  Substitute the "002" with the first three-or-so digits of the Container ID, found from the "docker ps" command.  This will change your shell prompt to reflect that you're now issuing commands from within the container.
docker exec -it 002 bash

// Log into the database, then create a specific database nnamed "hackathonapp".  This will change your shell prompt again, to reflect that you're now issuing commands from the database itself, which resides within the container.
psql -U postgres
create database hackathonapp;

// Exit out of both prompts to return to a Linux prompt.  From the "api" folder, issues these three Knex commands to 1) destroy all tables, 2) recreate all tables, & 3) seed the tables with test data.
npx knex migrate:rollback
npx knex migrate:latest
npx knex seed:run

// Now, the Per Diem table's data does not reside within a Knex file, so instead you need to copy the CSV file to a specific folder then issue a database command to import it.

// Copy the CSV file.
sudo cp per_diem_chart.csv $HOME/docker/volumes/postgres/.

// Log into the postgres docker prompt, then change the ownership of the per diem chart so postgres can see it.
chown postgres:postgres /var/lib/postgresql/data/per_diem_chart.csv

// Log into the database, then import the CSV into your DB.
COPY per_diem_chart(country,location,season_code,season_start_date,season_end_date,lodging_rate,meals_incidentals,per_diem,effective_date,footnote_reference,location_code)
FROM '/var/lib/postgresql/data/per_diem_chart.csv'
DELIMITER ','
CSV HEADER;