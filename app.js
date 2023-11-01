
const express = require('express')
const app = express()
require('dotenv').config()
const logger = require('morgan')
app.use(logger('dev'))

const bodyParser = require('body-parser')
const databaseInit = require('./src/database/dbinit')
databaseInit()
const appRoutes = require('./src/routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", appRoutes)

module.exports = app;