import express from 'express'
const router = express.Router()

export default (query) => {
  // router.get('/', (req, res) => {
  //   query('comments')
  //     .select({
  //       id: 'id',
  //       content: 'content',
  //       createdAt: 'created_at',
  //       score: 'score',
  //       user: 'user',
  //       replyTo: 'replyTo',
  //     })
  //     .then((rows) => {
  //       Promise.all(
  //         rows.map((comment) => {
  //           return query('users')
  //             .select({
  //               username: 'username',
  //               image: 'image_png',
  //             })
  //             .where({ id: comment.user })
  //             .then((rows) => {
  //               comment.user = rows[0]
  //               return comment //comment at this point is looking correct
  //             })
  //         })
  //       ).then((data) => res.json(data))
  //     })
  // })

  router.get('/', (req, res) => {
    query('comments')
      .join('users', 'users.id', 'comments.user')
      .select({
        id: 'comments.id',
        content: 'comments.content',
        createdAt: 'comments.created_at',
        score: 'comments.score',
        username: 'users.username',
        image: 'users.image_png',
        replyTo: 'replyTo',
      })
      .then((rows) => {
        Promise.all(
          rows.map((comment) => {
            comment.user = { username: comment.username, image: comment.image }
            delete comment.username
            delete comment.image
            return comment
          })
        ).then((data) => res.json(data))
      })
  })

  return router
}
