const express = require('express')
const router = express.Router()

//--db--helpers
const Users = require('../../models/auth-model')

const bcrypt = require('bcrypt')
const generateToken = require('../../util/generateToken')
// --Register--
router.post('/register', (req, res) => {
    const user = req.body

    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash

    Users.add(user).then((_user) => {
        if (!_user) {
            res.status(400).json({ messege: 'Something went wrong with the Registration' })
        } else {
            res.status(201).json({ messege: 'User Created Succesfully!' })
        }
    }).catch(() => {
        res.status(500).json({ messege: 'an error has occurred' })
    })
})

// --login--
router.post('/login', (req, res) => {
    const { username, password } = req.body
    Users.find(username)
        .then((_user) => {
            if (_user && bcrypt.compareSync(password, _user.password)) {

                const token = generateToken(_user)
                res.status(200).json({ messege: 'Log in Success!', token })
            } else {
                res.status(400).json({ messege: 'Invalid Credentials... try again' })
            }
        })
        .catch((_err) => {
            console.log(_err)
            res.status(500).json({ messege: 'an error has occurred' ,error:_err})
        })
})
module.exports = router