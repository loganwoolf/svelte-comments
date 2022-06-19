import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import query from './db/db-config.js'
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // replaces body-parser
app.use(express.static('dist')) // serves dist folder on /
app.use('/images', express.static('images')) // serves images folder on /images

import commentRoutes from './routes/comments.js'
app.use('/api/v1/comments', commentRoutes(query))
import userRoutes from './routes/users.js'
app.use('/api/v1/users', userRoutes(query))

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
