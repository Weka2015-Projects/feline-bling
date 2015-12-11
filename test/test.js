'use strict'

const loadDb = require('./helpers/load-db')
const app = require('../app')
const request = require('co-supertest').agent(app.listen())
const expect = require('chai').expect
require ('co-mocha')
app.DB_FILENAME = './test/db.json'

describe('API catpoints', () => {
  beforeEach(() => (loadDb('fixtures')) )
  describe('GET /cats', () => {
    it('returns 200', function *() {
      yield request.get('/cats').expect(200).end()
    })
    it('returns all cats', function *(){
      let res = yield request.get('/cats').end()
      expect(res.body.length).to.equal(5)
    })
  })

  describe('GET /cats/:id', () => {
    it('returns 200 if found', function *(){
      yield request.get('/cats/1').expect(200).end()
    })
    it('returns cat with correct id', function *(){
      let res = yield request.get('/cats/1').end()
      expect(res.body.id).to.equal(1)
    })
  })

  describe('POST /cats', () => {
    it('returns 201 if move was successful', function *(){
      yield request.post('/cats').send({"name" : "bro"}).expect(201).end()
    })
    it('Database is one longer', function *(){
      yield request.post('/cats').send({"name" : "bro"})
      let res = yield request.get('/cats').end()
      expect(res.body.length).to.equal(6)
    })
  })

  describe('PATCH /cats/:id', () => {
    it('returns 200 if patched', function *(){
      yield request.patch('/cats/1').send({"name" : "bungalo billsephony"}).expect(200).end()
    })
    it('returns cat with new property', function *(){
      yield request.patch('/cats/1').send({"name" : "bungalo billsephony"})
      let res = yield request.get('/cats/1').end()
      expect(res.body.name).to.equal('bungalo billsephony')
    })
  })

  describe('DELETE /cats', () => {
    it('returns 204 if deleted', function *(){
      yield request.del('/cats/1').expect(204).end()
    })
    it('returns 404 if cat is deleted', function *(){
      yield request.del('/cats/1')
      yield request.get('/cats/1').expect(404).end()
    })
  })
})
