var path = require('path')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(morgan('short'))
app.use('/static', express.static(path.join(__dirname, '../public')))

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.get('/path', function(req, res) {
  res.send(path.join(__dirname, '../public'))
})

app.listen(3000, function() {
  console.log('app is running')
})