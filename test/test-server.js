const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Room', function () {
  it('should list ALL rooms on /room GET', function (done) {
    chai.request(server)
      .get('/room')
      .end(function (err, res) {
        // err.should.equal(err, null)
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        done()
      })
  })
  it('should add a SINGLE room on /room POST', function (done) {
    chai.request(server)
      .post('/room')
      .send({ 'name': 'Test Room' })
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.should.be.a('object')
        res.body._id.should.be.a('string')
        res.body.name.should.equal('Test Room')
        res.body.reservations.should.be.a('array')
        done()
      })
  })
  it('should list a SINGLE room on /room/:id GET', function (done) {
    chai.request(server)
      .get('/room')
      .end(function (err, res) {
        chai.request(server)
          .get(`/room/${res.body[0]._id}`)
          .end(function (err, res2) {
            res2.should.have.status(200)
            res2.should.be.json
            res2.body.should.be.a('object')
            res2.body._id.should.equal(res.body[0]._id)
            res2.body.name.should.equal(res.body[0].name)
            res2.body.reservations.should.be.a('array')
            // res2.body.reservations.should.equal(res.body[0].reservations)
            done()
          })
      })
  })
  it('should update a SINGLE room on /room/:id PUT', function (done) {
    done()
  })
  it('should delete a SINGLE room and ALL linked reservations on /room/:id PUT', function (done) {
    done()
  })
})
