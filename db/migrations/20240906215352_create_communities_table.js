/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('communities', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.bigInteger('communityTypeID').notNullable();
        table.string('name', 100).notNullable();
        table.string('focus', 100);
        table.string('basis', 100);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('communities');
};
