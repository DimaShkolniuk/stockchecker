const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')

// Viewing one stock: GET request to /api/stock-prices/
// Viewing one stock and liking it: GET request to /api/stock-prices/
// Viewing the same stock and liking it again: GET request to /api/stock-prices/
// Viewing two stocks: GET request to /api/stock-prices/
// Viewing two stocks and liking them: GET request to /api/stock-prices/

chai.use(chaiHttp)

suite('Functional Tests', function () {
  test('Viewing one stock: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices/')
      .set('content-type', 'application-json')
      .query({ stock: 'TSLA' })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.stockData.stock, 'TSLA')
        assert.exists(res.body.stockData.price, 'TSLA has a price')
        done()
      })
  })
  test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices/')
      .set('content-type', 'application-json')
      .query({ stock: 'GOLD', like: true })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.stockData.stock, 'GOLD')
        assert.equal(res.body.stockData.likes, 1)
        assert.exists(res.body.stockData.price, 'GOLD has a price')
        done()
      })
  })
  test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices/')
      .set('content-type', 'application-json')
      .query({ stock: 'GOLD', like: true })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.stockData.stock, 'GOLD')
        assert.equal(res.body.stockData.likes, 1)
        assert.exists(res.body.stockData.price, 'GOLD has a price')
        done()
      })
  })
  test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices/')
      .query({ stock: ['GOOG', 'AMZN'] })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.stockData[0].stock, 'GOOG') // Check first stock
        assert.equal(res.body.stockData[1].stock, 'AMZN') // Check second stock
        assert.exists(res.body.stockData[0].price, 'GOOG has a price')
        assert.exists(res.body.stockData[1].price, 'AMZN has a price')
        done()
      })
  })
  test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices/')
      .set('content-type', 'application-json')
      .query({ stock: ['GOOG', 'MSFT'], likes: true })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.stockData[0].stock, 'GOOG')
        assert.equal(res.body.stockData[1].stock, 'MSFT')
        assert.exists(res.body.stockData[0].price, 'GOOG has a price')
        assert.exists(res.body.stockData[1].price, 'MSFT has a price')
        assert.exists(res.body.stockData[0].rel_likes, 'has rel_likes')
        assert.exists(res.body.stockData[1].rel_likes, 'has rel_likes')
        done()
      })
  })
})
