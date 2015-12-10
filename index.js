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

})


// get all the cats
router.get('/cats', function *(next) {
  const json = JSON.parse(fs.readFileSync('./db.json').toString())

  this.set('Content-Type', 'application/json')
  this.body = json.cats
  this.status = 200
  console.log(json.cats)

  this.set('Content-Type', 'application/json')
})



// get cats by ID
router.get('/cats/:id', function *(next) {
  const json = JSON.parse(fs.readFileSync('./db.json').toString())

  const cat = R.filter((cat) => parseInt(cat.id) === parseInt(this.params.id), json.cats)

  this.set('Content-Type', 'application/json')
  this.body = cat
  this.status = 200
})


router.post('/cats', function *(next) {

})

router.patch('/cats/:id', function *(next) {



})

router.delete('/cats/:id', function *(next) {

})

app.use(router.routes())

app.listen(4000, () => console.log('Listening on port 4000.'))
