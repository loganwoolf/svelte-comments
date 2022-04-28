import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import db from './db/db.js' //soon to be replaced with sqlite3
import query from './db/db-config.js'
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // replaces body-parser

import commentRoutes from './routes/comments.js'
app.use('/comments', commentRoutes(query))
import userRoutes from './routes/user.js'
app.use('/user', userRoutes(db))
import testRoutes from './routes/test.js'
app.use('/test', testRoutes(query))

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
