/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('comments', (table) => {
    table.dropColumn('replyTo')
    table.integer('reply_to')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('comments', (table) => {
    table.dropColumn('reply_to')
    table.integer('replyTo')
  })
}
