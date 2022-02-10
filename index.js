require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use('/books', require('./controllers/books'))

app.listen(process.env.PORT)