/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('donations', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.bigInteger('donationTypeID').notNullable();
        table.text('remarks');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('donations');
};
