/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sponsors', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.smallint('sponsorType').comment('0 - Incidentil, 1 - Routine');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('sponsors');
};
