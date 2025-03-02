"use strict";

export default function formatDate(dateString) {
  const [_, month, date, year] = dateString.split(" ");
  return `${date} ${month} ${year}`;
}
