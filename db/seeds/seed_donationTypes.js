/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('donationTypes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('donationTypes').insert([
        { name: 'item'},
        { name: 'location'},
        { name: 'fund'},
      ]);
    });
};
