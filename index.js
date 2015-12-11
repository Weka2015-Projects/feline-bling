'use strict'

const app = require('./app')
app.DB_FILENAME = './db.json'

app.use(router.routes())


app.listen(4000, () => console.log('Listening on port 4000.'))

module.exports = app
