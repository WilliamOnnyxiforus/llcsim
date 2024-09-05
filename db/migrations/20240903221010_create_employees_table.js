/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.string('username', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employees');
};
