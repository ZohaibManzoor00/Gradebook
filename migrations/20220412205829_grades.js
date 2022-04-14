/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('grades', table => {
        // Prevent duplicate data
        table.primary(['student_id', 'assignment_id'])
        table.integer('student_id').notNullable()
        table.integer('assignment_id').notNullable()
        table.integer('grade').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('grades')
};
