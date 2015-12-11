'use strict'

const app = require('./app')
app.DB_FILENAME = './db.json'



app.listen(4000, () => console.log("Listening on port 4000."))
