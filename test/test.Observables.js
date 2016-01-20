/**
 * Created by tusharmathur on 7/29/15.
 */
"use strict"
var Observables = require('../src/observables'),
  Rx = require('rx'),
  fs = require('fs'),
  removeFile = (x) => Rx.Observable.fromCallback(fs.unlink)(x).toPromise()

describe("Observables", function () {
  it("HEAD request to jpg file", function * () {
    var response = yield Observables.requestBody('http://localhost:3000/files/pug.jpg')
      .filter(x => x.event === 'response')
      .pluck('message')
      .toPromise()
    response.headers['content-length'].should.equal('317235')
  })

  it("HTTPS HEAD request to jpg file", function * () {
    var url = 'https://localhost:3001/files/pug.jpg', strictSSL = false
    var response = yield Observables.requestBody({url, strictSSL})
      .filter(x => x.event === 'response')
      .pluck('message')
      .toPromise()
    response.headers['content-length'].should.equal('317235')
  })

  it("HEAD request to 1024 bytes file", function * () {
    var response = yield Observables.requestBody('http://localhost:3000/range/1024.txt')
      .filter(x => x.event === 'response')
      .pluck('message')
      .toPromise()
    response.headers['content-length'].should.equal('1024')
  })
  describe("fsOpen()", function () {
    afterEach(function *() {
      return removeFile('./.temp/open.txt')
    })
    it("file open request", function * () {
      var response = yield Observables.fsOpen('./.temp/open.txt', 'w+')
        .toPromise()
      response.should.be.a('number')
    })
  })

})
