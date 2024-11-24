/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('officials', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.bigInteger('periodeID').notNullable();
        table.date('startDate');
        table.date('endDate');
        table.text('interviewResult');
        table.smallint('status').comment('0 - Inactive, 1 - Active');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('officials');
};
