// eslint-disable handle-callback-err
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const faker = require('faker')

chai.use(chaiHttp)

describe('Room', function () {
  let testRoom
  it('should add a SINGLE room on /room POST', function (done) {
    const newName = `${faker.company.bsBuzz()} ${faker.commerce.department()}`
    chai.request(server)
      .post('/room')
      .send({ 'name': newName })
      .end(function (err, res) {
        testRoom = {
          _id: res._id,
          name: res.name,
          reservations: res.reservations
        }
        res.should.have.status(200)
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
      .get('/room')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        done()
      })
  })
  it('should list a SINGLE room on /room/:id GET', function (done) {
    chai.request(server)
      .get(`/room/${testRoom._id}`)
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
    const newName = `${faker.company.bsBuzz()} ${faker.commerce.department()}`
    testRoom.name = newName
    chai.request(server)
      .put(`/room/${testRoom._id}`)
      .send({
        'name': newName,
        'reservations': []
      })
      .end(function (err, res2) {
        res2.should.have.status(200)
        res2.should.be.json
        res2.body.should.be.a('object')
        res2.body._id.should.equal(testRoom._id)
        res2.body.name.should.equal(testRoom.name)
        res2.body.reservations.should.be.a('array')
        res2.body.reservations.should.eql([])
        done()
      })
  })
  it('should delete a SINGLE room and ALL linked reservations on /room/:id PUT', function (done) {
    chai.request(server)
      .delete(`/room/${testRoom._id}`)
      .end(function (err, res) {
        // TODO: Verify reservations have been deleted
        res.should.have.status(200)
        res.should.be.json
        res.body.deleted.should.equal(true)
        done()
      })
  })
})
