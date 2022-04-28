import express from 'express'
const router = express.Router()

export default (db) => {
  router.get('/', (req, res) => {
    res.send(db.currentUser)
  })

  return router
}
