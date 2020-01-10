require('dotenv').config()
const server = require('./server')

const PORT = process.env.PORT

var https = require("https");
setInterval(function() {
    https.get("https://dad-jokes--api.herokuapp.com/");
}, 1000 * 60 * 5); // every 5 minutes (300000)

server.get('/', (req, res) => {
    res.send(`
    <div>
        <h1>Welcome to DadJokes Api</h1>
        <p>author: Austin Lynes</p>
    </div>
    `)
})

// -- final middleware --
server.use(function (req, res) {
    res.status(404).send(`
    <div>
        <h1>that page doesnt exist..</h1>
    </div>
    `);
})

server.listen(PORT, () => {
    console.log(`********//   API OPEN ON PORT ${PORT}  //********`)
})