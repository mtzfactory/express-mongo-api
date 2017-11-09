const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001
const DATABASE = 'test'
const MONGO_URL = `mongodb://localhost:27017/${DATABASE}`

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = require('./db')

db.connect(MONGO_URL, function(err) {
    if (err) {
        console.error(`Unable to connect to Mongo database: ${err.message}`)
        process.exit(1)
    } else {
        app.use('/api/restaurants', require('./routes'))

        app.listen(PORT, function() {
            console.log(`\n> Magic happens in port ${PORT}`)
        })
    }
})

process.on('SIGNINT', () => {
    console.log('\n Closing HTTP and Mongo server...')

    db.close()

    process.exit(0)
})
