// eslint-disable handle-callback-err
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const faker = require('faker')
const moment = require('moment')

chai.use(chaiHttp)

describe('Reservation', function () {
  it('should add a SINGLE reservation on /reservation POST', function (done) {
    const newMeetingName = `${faker.name.jobType()} ${faker.company.catchPhraseAdjective()} meeting`
    const user = faker.helpers.userCard()
    const newStart = moment().subtract(Math.floor(Math.random() * 600), 'days').subtract(Math.floor(Math.random() * 10), 'hours').format()
    const newEnd = moment(newStart).add(1, 'hour').format()
    chai.request(server)
      .post('/reservation')
      .send({
        'meetingName': newMeetingName,
        'owner': user.name,
        'ownerEmail': user.email,
        'start': newStart,
        'end': newEnd
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.should.be.a('object')
        res.body._id.should.be.a('string')
        res.body.meetingName.should.equal(newMeetingName)
        res.body.owner.should.equal(user.name)
        res.body.ownerEmail.should.equal(user.email)
        res.body.start.should.equal(newStart)
        res.body.end.should.equal(newEnd)
        done()
      })
  })
  it('should list a SINGLE reservation on /reservation/:id GET')
  it('should update a SINGLE reservation on /reservation/:id PUT')
  it('should delete a SINGLE reservation on /reservation/:id DELETE')
})
