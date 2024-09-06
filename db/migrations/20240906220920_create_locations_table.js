/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('locations', function (table) {
        table.increments('id').primary();
        table.bigInteger('address').notNullable();
        table.bigInteger('city').notNullable();
        table.text('remarks');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('locations');
};
