/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('memberships', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.bigInteger('communityID').notNullable();
        table.smallint('membershipType').comment('1. SME, 2. LCS');
        table.string('role', 255);
        table.json('remarks');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('memberships');
};
