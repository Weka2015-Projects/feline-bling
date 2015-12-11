const fs = require('fs-extra')

function loadDb(fixture) {
  fs.copySync(__dirname + `/../fixtures/db-${fixture}.json`, __dirname + '/../db.json')
}
module.exports = loadDb
