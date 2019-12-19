require('dotenv').config()
const server = require('./server')

const PORT = process.env.PORT

server.get('/', (req,res)=>{
    res.send(`
    <div>
        <h1>Welcome to DadJokes Api</h1>
        <p>author: Austin Lynes</p>
    </div>
    `)
})

server.listen(PORT, ()=>{
    console.log(`********//   API OPEN ON PORT ${PORT}  //********`)
})