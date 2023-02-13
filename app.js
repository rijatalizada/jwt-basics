require('express-async-errors')
const express = require('express')
const app = express()

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const mainRouter = require('./routes/main')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api', mainRouter)

// middleware
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


const port = 3001

const start = () => {
    try {
        app.listen(port, console.log(`App is listening to the port ${port}`))
    } catch (error) {
        throw new Error(error)
    }
}

start()