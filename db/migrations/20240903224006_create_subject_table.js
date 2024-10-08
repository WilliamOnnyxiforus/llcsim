/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('subjects', function (table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('grade', 100);
        table.string('category', 100);
        table.string('tag', 100);
        table.text('description');
        table.text('silabus');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('subjects');
};
