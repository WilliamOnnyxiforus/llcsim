require('dotenv').config();
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  // Deletes ALL existing entries
  return knex('employees')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        { userID: process.env.ADMIN_ID, username: process.env.ADMIN_USERNAME, password: hashedPassword, isNewPassword: 0, isBlocked: 0},
      ]);
    });
};
