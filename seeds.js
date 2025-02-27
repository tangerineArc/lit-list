#! /usr/bin/env node

"use strict";

import "dotenv/config";
import pg from "pg";

const { native } = pg;
const { Client } = native;

const SQL = `
DELETE FROM examples;

INSERT INTO examples (example_text)
VALUES
  ('Zeus'),
  ('Poseidon'),
  ('Hades');
`;

async function main() {
  console.log("seeding started ...");

  const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL,
    ssl: {
      rejectUnauthorized: false,
    }
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("... seeding finished");
}

main();
