import express from 'express'
const router = express.Router()

export default (query) => {
  router.get('/', (req, res) => {
    res.send('HELLO')
  })

  router.get('/users', (req, res) => {
    query('users').then((rows) => {
      return res.json(rows)
    })
  })

  router.get('/comments', (req, res) => {
    query('comments').then((rows) => {
      return res.json(rows)
    })
  })

  return router
}
