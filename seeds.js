#! /usr/bin/env node

"use strict";

import "dotenv/config";
import pg from "pg";

const { native } = pg;
const { Client } = native;

const SQL = `
DELETE FROM book_author_relation;
DELETE FROM book_genre_relation;
DELETE FROM book;
DELETE FROM author;
DELETE FROM genre;

INSERT INTO book ( id, name, stock, price, publicationDate )
VALUES
  (
    1,
    'The Da Vinci Code',
    ${Math.floor(Math.random() * 11)},
    499.00,
    '2003-03-18'
  ),
  (
    2,
    'Angels & Demons',
    ${Math.floor(Math.random() * 11)},
    305.00,
    '2000-05-01'
  ),
  (
    3,
    'Origin',
    ${Math.floor(Math.random() * 11)},
    359.00,
    '2017-10-01'
  ),
  (
    4,
    'Lost Symbol',
    ${Math.floor(Math.random() * 11)},
    299.00,
    '2009-09-15'
  ),
  (
    5,
    'Deception Point',
    ${Math.floor(Math.random() * 11)},
    329.00,
    '2001-01-01'
  ),
  (
    6,
    'Digital Fortress',
    ${Math.floor(Math.random() * 11)},
    499.00,
    '1998-02-01'
  ),
  (
    7,
    'Inferno',
    ${Math.floor(Math.random() * 11)},
    299.00,
    '2013-05-13'
  ),
  (
    8,
    'Adventures of Huckleberry Finn',
    ${Math.floor(Math.random() * 11)},
    179.00,
    '1884-12-10'
  ),
  (
    9,
    'The Adventures of Tom Sawyer',
    ${Math.floor(Math.random() * 11)},
    229.00,
    '1876-06-09'
  ),
  (
    10,
    'David Copperfield',
    ${Math.floor(Math.random() * 11)},
    296.00,
    '1850-11-01'
  ),
  (
    11,
    'Hard Times',
    ${Math.floor(Math.random() * 11)},
    159.00,
    '1854-08-01'
  ),
  (
    12,
    'Memory Man',
    ${Math.floor(Math.random() * 11)},
    347.00,
    '2015-09-15'
  ),
  (
    13,
    'The Alchemist',
    ${Math.floor(Math.random() * 11)},
    258.00,
    '1988-01-01'
  ),
  (
    14,
    'The Devil & Miss Prym',
    ${Math.floor(Math.random() * 11)},
    258.00,
    '2000-01-01'
  ),
  (
    15,
    'The Witch of Portobello',
    ${Math.floor(Math.random() * 11)},
    270.00,
    '2006-09-01'
  ),
  (
    16,
    'By the River Piedra I Sat Down and Wept',
    ${Math.floor(Math.random() * 11)},
    349.00,
    '1994-01-01'
  ),
  (
    17,
    'Verity',
    ${Math.floor(Math.random() * 11)},
    257.00,
    '2018-12-07'
  ),
  (
    18,
    'It Ends With Us',
    ${Math.floor(Math.random() * 11)},
    249.00,
    '2016-08-02'
  ),
  (
    19,
    'The Lost Hero',
    ${Math.floor(Math.random() * 11)},
    322.00,
    '2010-10-12'
  ),
  (
    20,
    'The Son of Neptune',
    ${Math.floor(Math.random() * 11)},
    323.00,
    '2011-10-04'
  ),
  (
    21,
    'The Mark of Athena',
    ${Math.floor(Math.random() * 11)},
    322.00,
    '2012-10-02'
  ),
  (
    22,
    'The House of Hades',
    ${Math.floor(Math.random() * 11)},
    322.00,
    '2013-10-08'
  ),
  (
    23,
    'The Blood of Olympus',
    ${Math.floor(Math.random() * 11)},
    327.00,
    '2014-10-07'
  ),
  (
    24,
    'Percy Jackson and The Lightning Thief',
    ${Math.floor(Math.random() * 11)},
    294.00,
    '2005-07-01'
  ),
  (
    25,
    'Percy Jackson and The Sea of Monsters',
    ${Math.floor(Math.random() * 11)},
    292.00,
    '2006-04-01'
  ),
  (
    26,
    'Percy Jackson and The Titan''s Curse',
    ${Math.floor(Math.random() * 11)},
    290.00,
    '2007-05-01'
  ),
  (
    27,
    'Percy Jackson and The Battle of the Labyrinth',
    ${Math.floor(Math.random() * 11)},
    288.00,
    '2008-05-06'
  ),
  (
    28,
    'Percy Jackson and the Last Olympian',
    ${Math.floor(Math.random() * 11)},
    286.00,
    '2009-05-05'
  ),
  (
    29,
    'Five Point Someone: What not to do at IIT',
    ${Math.floor(Math.random() * 11)},
    211.00,
    '2004-05-01'
  ),
  (
    30,
    'The 3 Mistakes of My Life',
    ${Math.floor(Math.random() * 11)},
    234.00,
    '2008-01-01'
  ),
  (
    31,
    'Revolution 2020: Love, Corruption, Ambition',
    ${Math.floor(Math.random() * 11)},
    204.00,
    '2011-10-05'
  ),
  (
    32,
    '2 States: The Story of My Marriage',
    ${Math.floor(Math.random() * 11)},
    202.00,
    '2009-10-08'
  ),
  (
    33,
    'The Girl in Room 105',
    ${Math.floor(Math.random() * 11)},
    181.00,
    '2018-10-01'
  ),
  (
    34,
    'One Indian Girl',
    ${Math.floor(Math.random() * 11)},
    200.00,
    '2016-10-01'
  ),
  (
    35,
    '400 Days',
    ${Math.floor(Math.random() * 11)},
    180.00,
    '2021-10-08'
  ),
  (
    36,
    'One Arranged Murder',
    ${Math.floor(Math.random() * 11)},
    185.00,
    '2020-09-28'
  ),
  (
    37,
    'Half Girlfriend',
    ${Math.floor(Math.random() * 11)},
    223.00,
    '2014-10-01'
  ),
  (
    38,
    'One Night @ the Call Center',
    ${Math.floor(Math.random() * 11)},
    233.00,
    '2005-10-05'
  ),
  (
    39,
    'The Namesake',
    ${Math.floor(Math.random() * 11)},
    200.00,
    '2003-09-01'
  ),
  (
    40,
    'Ram: Scion of Ikshvaku',
    ${Math.floor(Math.random() * 11)},
    259.00,
    '2015-06-22'
  ),
  (
    41,
    'Sita: Warrior of Mithila',
    ${Math.floor(Math.random() * 11)},
    259.00,
    '2017-05-29'
  ),
  (
    42,
    'Raavan: Enemy of Aryavarta',
    ${Math.floor(Math.random() * 11)},
    258.00,
    '2019-07-01'
  ),
  (
    43,
    'War of Lanka',
    ${Math.floor(Math.random() * 11)},
    321.00,
    '2022-10-03'
  ),
  (
    44,
    'Legend of Suheldev: The King Who Saved India',
    ${Math.floor(Math.random() * 11)},
    259.00,
    '2020-06-20'
  ),
  (
    45,
    'Bullet Train',
    ${Math.floor(Math.random() * 11)},
    1524.00,
    '2010-09-01'
  ),
  (
    46,
    'Nineteen Eighty-Four',
    ${Math.floor(Math.random() * 11)},
    379.00,
    '1949-06-08'
  ),
  (
    47,
    'The Catcher in the Rye',
    ${Math.floor(Math.random() * 11)},
    299.00,
    '1951-07-16'
  );

INSERT INTO author ( id, name, birthDate )
VALUES
  ( 1, 'Dan Brown', '1964-07-22' ),
  ( 2, 'Mark Twain', '1835-11-30' ),
  ( 3, 'Charles Dickens', '1812-02-07' ),
  ( 4, 'David Baldacci', '1960-08-05' ),
  ( 5, 'Paulo Coelho', '1947-08-24' ),
  ( 6, 'Colleen Hoover', '1979-12-11' ),
  ( 7, 'Rick Riordan', '1964-06-05' ),
  ( 8, 'Chetan Bhagat', '1974-04-22' ),
  ( 9, 'Jhumpa Lahiri', '1967-07-11' ),
  ( 10, 'Amish Tripathi', '1974-10-18' ),
  ( 11, 'Kōtarō Isaka', '1971-05-25' ),
  ( 12, 'George Orwell', '1903-06-25' ),
  ( 13, 'JD Salinger', '1919-01-01' );

INSERT INTO genre ( id, type )
VALUES
  ( 1, 'fiction' ),
  ( 2, 'mystery' ),
  ( 3, 'detective' ),
  ( 4, 'conspiracy' ),
  ( 5, 'thriller' ),
  ( 6, 'crime' ),
  ( 7, 'techno' ),
  ( 8, 'picaresque' ),
  ( 9, 'bildungsroman' ),
  ( 10, 'satire' ),
  ( 11, 'folk' ),
  ( 12, 'children''s literature' ),
  ( 13, 'novel' ),
  ( 14, 'quest' ),
  ( 15, 'adventure' ),
  ( 16, 'fantasy' ),
  ( 17, 'philosophy' ),
  ( 18, 'spirituality' ),
  ( 19, 'love' ),
  ( 20, 'romance' ),
  ( 21, 'psychological' ),
  ( 22, 'greek' ),
  ( 23, 'roman' ),
  ( 24, 'mythology' ),
  ( 25, 'young adult' ),
  ( 26, 'buddy' ),
  ( 27, 'political' ),
  ( 28, 'feminism' ),
  ( 29, 'epic' ),
  ( 30, 'historical' ),
  ( 31, 'comedy' ),
  ( 32, 'dark' ),
  ( 33, 'dystopian' ),
  ( 34, 'social science' ),
  ( 35, 'realistic' ),
  ( 36, 'coming-of-age' );

INSERT INTO book_author_relation ( bookId, authorId )
VALUES
  ( 1, 1 ),
  ( 2, 1 ),
  ( 3, 1 ),
  ( 4, 1 ),
  ( 5, 1 ),
  ( 6, 1 ),
  ( 7, 1 ),
  ( 8, 2 ),
  ( 9, 2 ),
  ( 10, 3 ),
  ( 11, 3 ),
  ( 12, 4 ),
  ( 13, 5 ),
  ( 14, 5 ),
  ( 15, 5 ),
  ( 16, 5 ),
  ( 17, 6 ),
  ( 18, 6 ),
  ( 19, 7 ),
  ( 20, 7 ),
  ( 21, 7 ),
  ( 22, 7 ),
  ( 23, 7 ),
  ( 24, 7 ),
  ( 25, 7 ),
  ( 26, 7 ),
  ( 27, 7 ),
  ( 28, 7 ),
  ( 29, 8 ),
  ( 30, 8 ),
  ( 31, 8 ),
  ( 32, 8 ),
  ( 33, 8 ),
  ( 34, 8 ),
  ( 35, 8 ),
  ( 36, 8 ),
  ( 37, 8 ),
  ( 38, 8 ),
  ( 39, 9 ),
  ( 40, 10 ),
  ( 41, 10 ),
  ( 42, 10 ),
  ( 43, 10 ),
  ( 44, 10 ),
  ( 45, 11 ),
  ( 46, 12 ),
  ( 47, 13 );

INSERT INTO book_genre_relation ( bookId, genreId )
VALUES
  ( 1, 1 ),
  ( 1, 2 ),
  ( 1, 3 ),
  ( 1, 4 ),
  ( 1, 5 ),
  ( 2, 1 ),
  ( 2, 2 ),
  ( 2, 5 ),
  ( 3, 1 ),
  ( 3, 2 ),
  ( 3, 5 ),
  ( 4, 1 ),
  ( 4, 2 ),
  ( 4, 5 ),
  ( 4, 6 ),
  ( 5, 1 ),
  ( 5, 5 ),
  ( 6, 1 ),
  ( 6, 2 ),
  ( 6, 5 ),
  ( 6, 7 ),
  ( 7, 1 ),
  ( 7, 2 ),
  ( 7, 4 ),
  ( 7, 5 ),
  ( 8, 1 ),
  ( 8, 8 ),
  ( 8, 13 ),
  ( 9, 1 ),
  ( 9, 8 ),
  ( 9, 9 ),
  ( 9, 10 ),
  ( 9, 11 ),
  ( 9, 12 ),
  ( 9, 13 ),
  ( 10, 1 ),
  ( 10, 9 ),
  ( 10, 13 ),
  ( 11, 1 ),
  ( 11, 13 ),
  ( 12, 1 ),
  ( 12, 6 ),
  ( 12, 13 ),
  ( 13, 1 ),
  ( 13, 14 ),
  ( 13, 15 ),
  ( 13, 16 ),
  ( 14, 1 ),
  ( 14, 13 ),
  ( 14, 16 ),
  ( 14, 17 ),
  ( 14, 18 ),
  ( 15, 1 ),
  ( 15, 13 ),
  ( 16, 1 ),
  ( 16, 13 ),
  ( 17, 1 ),
  ( 17, 21 ),
  ( 18, 20 ),
  ( 19, 1 ),
  ( 19, 16 ),
  ( 19, 22 ),
  ( 19, 23 ),
  ( 19, 24 ),
  ( 19, 25 ),
  ( 20, 1 ),
  ( 20, 16 ),
  ( 20, 22 ),
  ( 20, 23 ),
  ( 20, 24 ),
  ( 20, 25 ),
  ( 21, 1 ),
  ( 21, 16 ),
  ( 21, 22 ),
  ( 21, 23 ),
  ( 21, 24 ),
  ( 21, 25 ),
  ( 22, 1 ),
  ( 22, 16 ),
  ( 22, 22 ),
  ( 22, 23 ),
  ( 22, 24 ),
  ( 22, 25 ),
  ( 23, 1 ),
  ( 23, 16 ),
  ( 23, 22 ),
  ( 23, 23 ),
  ( 23, 24 ),
  ( 23, 25 ),
  ( 24, 1 ),
  ( 24, 16 ),
  ( 24, 22 ),
  ( 24, 24 ),
  ( 24, 25 ),
  ( 25, 1 ),
  ( 25, 16 ),
  ( 25, 22 ),
  ( 25, 24 ),
  ( 25, 25 ),
  ( 26, 1 ),
  ( 26, 16 ),
  ( 26, 22 ),
  ( 26, 24 ),
  ( 26, 25 ),
  ( 27, 1 ),
  ( 27, 16 ),
  ( 27, 22 ),
  ( 27, 24 ),
  ( 27, 25 ),
  ( 28, 1 ),
  ( 28, 16 ),
  ( 28, 22 ),
  ( 28, 24 ),
  ( 28, 25 ),
  ( 29, 1 ),
  ( 29, 26 ),
  ( 30, 1 ),
  ( 31, 1 ),
  ( 31, 27 ),
  ( 31, 20 ),
  ( 32, 1 ),
  ( 32, 20 ),
  ( 33, 1 ),
  ( 33, 2 ),
  ( 33, 5 ),
  ( 34, 1 ),
  ( 34, 28 ),
  ( 35, 1 ),
  ( 35, 2 ),
  ( 35, 5 ),
  ( 36, 1 ),
  ( 36, 2 ),
  ( 36, 5 ),
  ( 37, 20 ),
  ( 38, 1 ),
  ( 39, 1 ),
  ( 40, 1 ),
  ( 40, 16 ),
  ( 40, 24 ),
  ( 40, 29 ),
  ( 41, 1 ),
  ( 41, 16 ),
  ( 41, 24 ),
  ( 41, 29 ),
  ( 41, 10 ),
  ( 42, 1 ),
  ( 42, 16 ),
  ( 42, 24 ),
  ( 42, 29 ),
  ( 43, 1 ),
  ( 43, 16 ),
  ( 43, 24 ),
  ( 43, 29 ),
  ( 44, 1 ),
  ( 44, 30 ),
  ( 45, 1 ),
  ( 45, 6 ),
  ( 45, 13 ),
  ( 45, 31 ),
  ( 45, 32 ),
  ( 46, 1 ),
  ( 46, 27 ),
  ( 46, 33 ),
  ( 46, 34 ),
  ( 47, 1 ),
  ( 47, 35 ),
  ( 47, 36 );

ALTER SEQUENCE book_id_seq RESTART WITH 48;

ALTER SEQUENCE author_id_seq RESTART WITH 14;

ALTER SEQUENCE genre_id_seq RESTART WITH 37;
`;

async function main() {
  console.log("seeding started ...");

  const client = new Client({
    connectionString: process.env.DB_CONNECTION_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("... seeding finished");
}

main();
