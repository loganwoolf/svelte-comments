import express from 'express'
const router = express.Router()

export default (query) => {
  router.get('/', (req, res) => {
    query('comments')
      .select({
        id: 'id',
        content: 'content',
        createdAt: 'created_at',
        score: 'score',
        user: 'user',
        replyTo: 'replyTo',
      })
      .then((rows) => {
        return rows.map((comment) => {
          query('users')
            .select({
              username: 'username',
              image: 'image_png',
            })
            .where({ id: comment.user })
            .then((rows) => {
              comment.user = rows[0]
            })
          return comment
        })
      })
      .then((data) => res.json(data))
  })

  return router
}
