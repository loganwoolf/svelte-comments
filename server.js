import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import db from './db/db.js'

const app = express()
const port = 5555

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send(db)
})

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
