/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('classes', function (table) {
        table.increments('id').primary();
        table.bigInteger('userID').notNullable();
        table.bigInteger('subjectID').notNullable();
        table.bigInteger('periodeID').notNullable();
        table.bigInteger('locationID').notNullable();
        table.bigInteger('classTypeID').notNullable();
        table.smallint('platform').comment('0 - Online, 1 - Offline');
        table.integer('studentNumber');
        table.smallint('status');
        table.date('startDate');
        table.date('endDate');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('classes');
};
