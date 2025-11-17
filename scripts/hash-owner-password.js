#!/usr/bin/env node
// Usage: node scripts/hash-owner-password.js mypassword
import bcrypt from 'bcryptjs';

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/hash-owner-password.js <password>');
  process.exit(1);
}

const saltRounds = 10;
const hash = bcrypt.hashSync(pw, saltRounds);
console.log('BCRYPT_HASH=' + hash);
