/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('students', table => {
        table.increments('id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255)
        table.string('email', 255)
        table.integer('grade')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
 return knex.schema.dropTable('students')
};
