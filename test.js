const assert = require('assert');
const catalog = require('./catalog');

let failures = 0;

function assertEqual(actual, expected, message) {
  try {
    assert.strictEqual(actual, expected);
    console.log(`PASS: ${message}`);
  } catch (error) {
    failures++;
    console.log(`FAIL: ${message}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual: ${actual}`);
  }
}

assertEqual(
  catalog.isValidLoan(5),
  true,
  'positive daysLate is valid'
);

assertEqual(
  catalog.isValidLoan(-1),
  false,
  'negative daysLate is invalid'
);

const fee = catalog.calculateLateFee(5, 2.25);
assertEqual(
  fee,
  11,
  'late fee for 5 days at $2.25/day'
);

assertEqual(
  catalog.calculateLateFee(10, 3),
  20,
  'late fee is capped at $20'
);

assertEqual(
  catalog.calculateLateFee(1, 2.25),
  0,
  'no late fee during the 1-day grace period'
);

assertEqual(
  catalog.calculateLateFee(3, 2.25),
  7,
  'late fee rounds 6.75 to 7'
);

assertEqual(
  catalog.calculateLateFee(2, 0.2),
  1,
  'late fee has a $1 minimum'
);

process.exitCode = failures > 0 ? 1 : 0;