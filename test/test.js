'use strict'

const app = require('../index')
const request = require('co-supertest').agent(app.listen())
const expect = require('chai').expect
require ('co-mocha')

describe('API catpoints', () => {

  describe('GET /cats', () => {
    before(() => ('cats') )
    xit('returns 200', function *() {
      yield request.get('/cats').expect(200).end()
    })
    xit('returns all cats', function *(){
      let res = yield request.get('/cats').end()
      expect(res.body.length).to.equal(5)
    })
  })

  describe('GET /cats/:id', () => {
    before(() => ('cats') )
    xit('returns 200 if found', function *(){
      yield request.get('/cats/1').expect(200).end()
    })
    xit('returns cat with correct id', function *(){
      let res = yield request.get('/cats/1').end()
      expect(res.body.id).to.equal(1)
    })
  })

  describe('POST /cats', () => {
    beforeEach( () => ('cats'))
    xit('returns 201 if move was successful', function *(){
      yield request.post('/cats').expect(201).end()
    })
    xit('last cat in database is equal to cat posted', function *(){
      yield request.post('/cats').expect(201).end()
      let res = yield request.get('/cats').end()
      expect(res.body.length).to.equal(6)
    })
  })

  describe('PATCH /cats/:id', () => {
    before( () => ('cats'))
    xit('returns 200 if patched', function *(){
      yield request.patch('/cats/1').expect(200).end()
    })
    xit('returns cat with new property', function *(){
    })
  })

  describe('DELETE /cats', () => {
    beforeEach( () => ('moves'))
    xit('returns 204 if deleted', function *(){
      yield request.del('/cats/1').expect(204).end()
    })
    xit('returns 404 if cat is deleted', function *(){
      yield request.del('/cats/1').expect(404).end()
      let res = yield request.get('/cats').end()
      expect(res.body.length).to.equal(4)
    })
  })
})
