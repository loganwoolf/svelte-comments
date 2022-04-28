/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.integer('user').notNullable().references('id').inTable('users')
    table.text('content').notNullable()
    table.timestamps(false, true)
    table.integer('replyTo')
    table.integer('score').notNullable().defaultTo(0)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('comments')
}
