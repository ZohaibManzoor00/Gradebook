/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('assignments', table => {
        table.increments('id');
        table.string('assignment_name', 255).notNullable();
        table.integer('grade').notNullable();
        table.string('subject', 255).notNullable()
        table.date('start_date', 255)
        table.date('due_date', 255)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('assignments')
};
