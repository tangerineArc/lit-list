"use strict";

import pool from "./pool.js";

async function getALlExamples() {
  const { rows } = await pool.query("SELECT * FROM examples");
  return rows;
}

async function insertExample(exampleText) {
  await pool.query("INSERT INTO examples (example_text) VALUES ($1)", [
    exampleText,
  ]);
}

export { getALlExamples, insertExample };
