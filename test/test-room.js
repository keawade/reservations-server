// eslint-disable handle-callback-err
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const faker = require('faker')

chai.use(chaiHttp)

const REST_URL = '/rest'

describe('Room', function () {
  let testRoom = {
    _id: '',
    name: '',
    reservations: []
  }
  it('should add a SINGLE room on /room POST', function (done) {
    const newName = `${faker.commerce.department()} ${faker.company.bsBuzz()}`
    chai.request(server)
      .post(`${REST_URL}/room`)
      .send({ 'name': newName })
      .end(function (err, res) {
        testRoom._id = res.body._id
        testRoom.name = res.body.name
        testRoom.reservations = res.body.reservations

        res.should.have.status(201)
        res.should.be.json
        res.should.be.a('object')
        res.body._id.should.be.a('string')
        res.body.name.should.equal(newName)
        res.body.reservations.should.be.a('array')
        done()
      })
  })
  it('should list ALL rooms on /room GET', function (done) {
    chai.request(server)
      .get(`${REST_URL}/room`)
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        done()
      })
  })
  it('should list a SINGLE room on /room/:id GET', function (done) {
    chai.request(server)
      .get(`${REST_URL}/room/${testRoom._id}`)
      .end(function (err, res2) {
        res2.should.have.status(200)
        res2.should.be.json
        res2.body.should.be.a('object')
        res2.body._id.should.equal(testRoom._id)
        res2.body.name.should.equal(testRoom.name)
        res2.body.reservations.should.be.a('array')
        res2.body.reservations.should.eql(testRoom.reservations)
        done()
      })
  })
  it('should update a SINGLE room on /room/:id PUT', function (done) {
    const newName = `${faker.commerce.department()} ${faker.company.bsBuzz()}`
    testRoom.name = newName
    chai.request(server)
      .put(`${REST_URL}/room/${testRoom._id}`)
      .send({
        'name': newName,
        'reservations': []
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body._id.should.equal(testRoom._id)
        res.body.name.should.equal(testRoom.name)
        res.body.reservations.should.be.a('array')
        res.body.reservations.should.eql([])
        done()
      })
  })
  it('should delete a SINGLE room and ALL linked reservations on /room/:id PUT', function (done) {
    chai.request(server)
      .delete(`${REST_URL}/room/${testRoom._id}`)
      .end(function (err, res) {
        // TODO: Verify reservations have been deleted
        res.should.have.status(200)
        res.should.be.json
        res.body.message.should.equal('room deleted')
        done()
      })
  })
})
