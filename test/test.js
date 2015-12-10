'use strict'

const app = require('../index')
const request = require('co-supertest').agent(app.listen())
const expect = require('chai').expect
require ('co-mocha')

describe('API catpoints', () => {

  describe('GET /cats', () => {
    before(() => ('cats') )
    xit('returns 200', function *(){
    })
    xit('returns all cats', function *(){
    })
  })

  describe('GET /cats/:id', () => {
    before(() => ('cats') )
    xit('returns 200 if found', function *(){
    })
    xit('returns cat with correct id', function *(){
    })
  })

  describe('POST /cats', () => {
    beforeEach( () => ('cats'))
    xit('returns 201 if move was successful', function *(){
    })
    xit('last cat in database is equal to cat posted', function *(){
    })
  })

  describe('PATCH /cats/:id', () => {
    before( () => ('cats'))
    xit('returns 200 if patched', function *(){
    })
    xit('returns cat with new property', function *(){
    })
  })

  describe('DELETE /cats', () => {
    beforeEach( () => ('moves'))
    xit('returns 204 if deleted', function *(){
    })
    xit('returns 404 if cat is deleted', function *(){
    })
  })
})
