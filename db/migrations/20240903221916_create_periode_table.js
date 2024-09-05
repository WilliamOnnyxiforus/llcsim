/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('periodes', function (table) {
        table.increments('id').primary();
        table.string('periodeName', 255).notNullable().unique();
        table.date('startDate');
        table.date('endDate');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('periodes');
};
