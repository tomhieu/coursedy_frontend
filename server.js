const express = require('express')
const port = process.env.PORT || 8088
const app = express()
app.use(express.static('client/dist'));
app.use(express.static('client/images'));
app.use(express.static('client/config'));
app.get('/*', function (req, res) {
  res.sendFile(`${__dirname}/client/dist/index.html`)
})
app.listen(port)
