import 'dotenv/config'
import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import knex from 'knex'

import db from './db/db.js' //soon to be replaced with sqlite3
import knexConfig from './db/knexfile.js'

const app = express()
const port = process.env.PORT
knex(knexConfig[process.env.NODE_ENV])

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // replaces body-parser

import commentRoutes from "./routes/comments.js"
app.use('/comments', commentRoutes(db))
import userRoutes from "./routes/user.js"
app.use('/user', userRoutes(db))

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
