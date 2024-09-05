/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'John Doe', email: 'john@example.com', password: '123456' },
        { name: 'Jane Doe', email: 'jane@example.com', password: '654321' },
      ]);
    });
};
