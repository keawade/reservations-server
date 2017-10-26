const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes')

mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpass}@ds011923.mlab.com:11923/reservations`)
mongoose.Promise = global.Promise
console.log('db connected')

const app = express()

app.use(bodyParser.json())

app.use(function (req, res, next) {
    /*
    * MAY need to be disabled in production.. unless mutliple clients are desired.
    * In this case a good idea would be to allow specific domains instead of the wildcard "*".
    *
    * First header allows any domain to make a request to the api.
    * Second header allows credentials to be passed as well incase authentication is ever desired.
    * Third line allows important client request headers to be set.
    * Last line dictates which HTTP methods are allowed. For now, that's all of them.
    */
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH')
    next()
})  

app.use('/', routes)

console.log('listening at localhost:3000')
app.listen(process.env.PORT || 3000)

module.exports = app
