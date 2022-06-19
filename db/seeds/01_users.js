/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'amyrobson',
      image_png: './images/avatars/image-amyrobson.png',
    },
    {
      id: 2,
      username: 'maxblagun',
      image_png: './images/avatars/image-maxblagun.png',
    },
    {
      id: 3,
      username: 'ramsesmiron',
      image_png: './images/avatars/image-ramsesmiron.png',
    },
    {
      id: 4,
      username: 'juliusomo',
      image_png: './images/avatars/image-juliusomo.png',
    },
  ])

  // set auto incrementing in Postgres after seed
  await knex.raw('select setval(\'users_id_seq\', max(id)) from users')
}
