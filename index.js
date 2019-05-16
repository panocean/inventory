
var express = require('express');
var mongoose = require('mongoose');
const request = require('request');
const path = require('path');
const fs = require('fs');
const csv=require('csvtojson');



var server = express();

mongoose.connect('mongodb://localhost/poocInventory', {useNewUrlParser: true})
.then(() => {
    console.log(`Connected to DB poocInventory`)
}).catch((err) => {
    console.log(err.message);
})

// csv()
//   .fromStream(request.get(fs.readFile(path.join(__dirname,'HQASSETEST.xlsx'))))
//   .subscribe((json) => {
//       return new Promise((resolve, reject) => {

//       })
//   })

server.get('/whatever', function (req, res) {
    res.send('Hello World')
})


server.get('/devices', function (req, res) {
    res.send('This route will return all panocean all devices')
})


server.use(express.json());

server.listen(3000, function() {
    console.log(`server running on port 3000`)
} )