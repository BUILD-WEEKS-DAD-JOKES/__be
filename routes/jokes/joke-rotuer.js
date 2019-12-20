const express = require('express')
const router = express.Router()

const Jokes = require('../../models/joke-model')
// const private = require('../../middleware/private')
//will return only the public jokesqw
router.get('/', (req,res)=>{

})
//will return all the jokes wether they are public or private
// router.get('/all', private, (req,res)=>{
 
// })

// router.put('/:id',private, (req,res)=>{

// })

// router.delete('/:id', private,(req,res)=>{

// })


module.exports = router