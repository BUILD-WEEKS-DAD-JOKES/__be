const express = require('express')
const router = express.Router()

const Jokes = require('../../models/joke-model')
const privateRoute = require('../../middleware/private-route')
//will return only the public jokesqw
router.get('/', (req, res) => {
    Jokes.findPublic().then((_joke) => {
        if (!_joke) {
            res.status(404).json({ messege: 'sorry... theres no jokes you are allowed to see... try signing up!' })
        } else {
            res.status(200).json(_joke)
        }
    }).catch((_err) => {
        res.status(500).json({ messege: 'something went terribly wrong... contact the author', _err })

    })
})
// will return all the jokes wether they are public or private
router.get('/all', privateRoute, (req, res) => {
    Jokes.find().then((_joke) => {
        if (!_joke) {
            res.status(404).json({ messege: 'sorry... theres no jokes... whomp whomp...' })
        } else {
            res.status(200).json(_joke)
        }
    }).catch(() => {
        res.status(500).json({ messege: 'something went terribly wrong... contact the author' })

    })
})
router.post('/', privateRoute, (req, res) => {
    const joke = req.body
    Jokes.add(joke)
        .then((_joke) => {
            if (!_joke) {
                res.status(404).json({ messege: 'sorry... Something is wrong with the joke.. whomp whomp...' })
            } else {
                res.status(201).json({ messege: 'Joke has been Created Successfully!' })
            }
        }).catch((_err) => {
            res.status(500).json({ messege: 'something went terribly wrong... contact the author',_err })
        })
})

router.delete('/:id', privateRoute, (req, res) => {
    const id = req.params.id
    Jokes.remove(id)
        .then((_joke) => {
            if (!_joke) {
                res.status(404).json({ messege: 'sorry.. joke doesnt exist with that id... whomp whomp...' })
            } else {
                res.status(200).json({ messege: 'Joke has been Deleted Successfully!' })
            }
        }).catch(() => {
            res.status(500).json({ messege: 'something went terribly wrong... contact the author' })
        })
})

router.put('/:id', privateRoute, (req, res) => {
    const id = req.params.id
    const changes = req.body
    Jokes.update(id, changes)
    .then((_joke)=>{
        if (!_joke) {
            res.status(404).json({ messege: 'sorry.. somethings mixed up... whomp whomp...' })
        } else {
            res.status(200).json({ messege: 'Joke has been updated Successfully!' })
        }
    })
    .catch(()=>{
        res.status(500).json({ messege: 'something went terribly wrong... contact the author' })
    })
})


module.exports = router