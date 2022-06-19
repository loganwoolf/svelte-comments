/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {
      id: 1,
      user: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      created_at: '2022-03-28 06:21:05',
      updated_at: '2022-03-28 06:21:05',
      votes: JSON.stringify({
        up_users: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        down_users: [61],
      }),
    },
    {
      id: 2,
      user: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      created_at: '2022-04-14 06:21:05',
      updated_at: '2022-04-14 06:21:05',
      votes: JSON.stringify({
        up_users: [21, 22, 23, 24, 25, 26, 4],
        down_users: [61, 62],
      }),
    },
    {
      id: 3,
      user: 3,
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      created_at: '2022-04-21 06:21:05',
      updated_at: '2022-04-21 06:21:05',
      reply_name: 'maxblagun',
      reply_to: 2,
      votes: JSON.stringify({
        up_users: [21, 22, 23, 24, 25],
        down_users: [61, 4],
      }),
    },
    {
      id: 4,
      user: 4,
      content:
        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      created_at: '2022-04-27 06:21:05',
      updated_at: '2022-04-27 06:21:05',
      reply_name: 'ramsesmiron',
      reply_to: 2,
      votes: JSON.stringify({ up_users: [21], down_users: [61, 62, 63] }),
    },
  ])

  // set auto incrementing in Postgres after seed
  await knex.raw('select setval(\'comments_id_seq\', max(id)) from comments')
}
