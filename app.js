'use strict'

const koa = require('koa')
const R = require('ramda')
const koaBody = require('koa-better-body')
const router = require('koa-router')()
const thunkify = require('thunkify-wrap')
const fs = require('fs')
const app = koa()

fs.readFile = thunkify(fs.readFile)

app.use(koaBody({
  extendTypes: {
    // will parse application/x-javascript type body as a JSON string
    json: ['application/x-javascript'],
    multipart: ['multipart/mixed']
  }
}))

router.get('/', function *(next) {
  console.log('I wuv cats')
})


// get all the cats
router.get('/cats', function *(next) {
  const json = JSON.parse(fs.readFileSync(app.DB_FILENAME).toString())
  this.set('Content-Type', 'application/json')
  this.body = json.cats
  this.status = 200
})

// get cats by ID
router.get('/cats/:id', function *(next) {
  const json = JSON.parse(fs.readFileSync(app.DB_FILENAME).toString())
  const cat = R.filter((cat) => parseInt(cat.id) === parseInt(this.params.id), json.cats)[0]
  this.set('Content-Type', 'application/json')
  this.body = cat
  this.status = typeof cat === 'undefined' ? 404 : 200
})


router.post('/cats', function *(next) {
  const json = JSON.parse(fs.readFileSync(app.DB_FILENAME).toString())
  const cat = this.request.body.fields
  cat['id'] = R.last(json.cats).id + 1
  json.cats.push(cat)
  this.set('Content-Type', 'application/json')
  this.body = cat
  this.status = 201
  fs.writeFileSync(app.DB_FILENAME
, JSON.stringify(json))

})

router.patch('/cats/:id', function *(next) {
  const json = JSON.parse(fs.readFileSync(app.DB_FILENAME).toString())
  const catPatch = this.request.body.fields
  const cat = R.filter((cat) => parseInt(cat.id) === parseInt(this.params.id), json.cats)[0]
  const currentIndex = R.indexOf(cat, json.cats)
  R.forEach(
    (key) => cat[key] = catPatch[key],
    R.keys(catPatch)
  )
  json.cats[currentIndex] = cat
  this.set('Content-Type', 'application/json')
  this.body = cat
  this.status = 200
  fs.writeFileSync(app.DB_FILENAME
, JSON.stringify(json))

})

router.delete('/cats/:id', function *(next) {
  const json = JSON.parse(fs.readFileSync(app.DB_FILENAME).toString())
  const cat = R.filter((cat) => parseInt(cat.id) === parseInt(this.params.id), json.cats)[0]
  const remove = R.indexOf(cat, json.cats)
  json.cats = R.remove(remove, 1, json.cats)
  this.set('Content-Type', 'application/json')
  this.body = json.cats
  this.status = 204
  fs.writeFileSync(app.DB_FILENAME
, JSON.stringify(json))
})

app.use(router.routes())

module.exports = app
