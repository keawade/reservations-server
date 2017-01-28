// eslint-disable handle-callback-err
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const faker = require('faker')

chai.use(chaiHttp)

describe('Fallback', function () {
  it('should handle unknown path requests', function (done) {
    chai.request(server)
      .get(`/${faker.company.catchPhraseAdjective}`)
      .end(function (err, res) {
        res.should.have.status(404)
        res.should.be.json
        res.body.message.should.equal('resource not found')
        done()
      })
  })
})
