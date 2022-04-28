import knex from 'knex'
import config from '../knexfile.js'

export default knex(config[process.env.NODE_ENV])
