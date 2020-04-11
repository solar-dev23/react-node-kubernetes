const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const swapiRoutes = require('./routes/swapi-routes')
const errorRoutes = require('./routes/error-routes')
let cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin: process.env.CLIENT || "http://localhost:3000",
    credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    }
}))

app.use(swapiRoutes)
app.use(errorRoutes)

app.listen(port, () => {
    console.log('Swapi server is up on port ' + port)
})

