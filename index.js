
var express = require('express');
var server = express();

server.get('/whatever', function (req, res) {
    res.send('Hello World')
})


server.get('/devices', function (req, res) {
    res.send('This route will return all panocean devices')
})

server.listen(3000, function() {
    console.log(`server running on port 3000`)
} )