/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('placeOfBirth', 100);
        table.date('dateOfBirth');
        table.text('address');
        table.string('email', 100).notNullable();
        table.string('phone');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
