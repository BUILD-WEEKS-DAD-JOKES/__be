const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = function (user){
    const payload = {
        subject:user.id,
        username:user.username
    }
    const options = {
        expiresIn:'7d'
    }
    return jwt.sign(payload,secrets.jwtSecret, options )

}