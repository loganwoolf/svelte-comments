/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const COMMENTS = 'comments'
const SCORE = 'score'
const VOTES = 'votes'

export function up(knex) {
  return knex.schema.alterTable(COMMENTS, (table) => {
    table.dropColumn(SCORE)
    table
      .json(VOTES)
      .notNullable()
      .defaultTo(
        JSON.stringify({
          up_users: [],
          down_users: [],
        })
      )
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable(COMMENTS, (table) => {
    table.dropColumn(VOTES)
    table.integer(SCORE).notNullable().defaultTo(0)
  })
}
