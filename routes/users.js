import express from 'express'
const router = express.Router()

export default (query) => {
  router.get('/current', (req, res) => {
    query('users')
      .select({
        username: 'username',
        image: 'image_png',
      })
      .where({
        id: 4,
      })
      .then((rows) => {
        res.json(rows[0])
      })
  })

  return router
}
