const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const authRouter = require('./routes/auth/auth-router')
const jokesRouter = require('./routes/jokes/joke-rotuer')

// --middleware--
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('combined'))

server.use('/auth', authRouter)
server.use('/api/jokes', jokesRouter)

module.exports = server