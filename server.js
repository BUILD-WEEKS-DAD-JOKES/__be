const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const authRouter = require('./routes/auth/auth-router')

// --middleware--
server.use(helmet())
server.use(morgan('combined'))
server.use(express.json())
server.use(cors())

server.use('/auth', authRouter)

module.exports = server