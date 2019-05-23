var express = require('express');
var mongoose = require('mongoose');
const request = require('request');
const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
const csvj = require('csvtojson');
const mongoImport = require('mongoimport');



var server = express();



mongoose.connect('mongodb://localhost/poocInventory', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Connected to DB poocInventory`)
    mongoose.connection.db.listCollections().toArray()
      .then(doc => {
        if (!doc[0].name === "devices") {
          csvj()
            .fromFile(path.join(__dirname, 'hq_asset_csv.csv'))
            .then(jsonObj => {
              console.log("the data", JSON.stringify(jsonObj, undefined, 2))
              const config = {
                fields: jsonObj,
                db: 'poocInventory',
                collection: 'devices',
                host: 'localhost:27017',
                callback: (err, db) => {
                  if (err) console.log("import error: ", err)
                }
              }
              mongoImport(config);
            })
            .catch(err => console.log(err))
        }
        console.log("collection already exists");
      })
  }).catch((err) => {
    console.log(err.message);
  })


// const db = mongoose.connection;



// csvj()
//   .fromFile(path.join(__dirname, 'hq_asset_csv.csv'))
//     .then(jsonObj => {
//         console.log("the data", JSON.stringify(jsonObj, undefined, 2))
//         const config = {
//             fields: jsonObj,
//             db: 'poocInventory',
//             collection: 'devices',
//             host: 'localhost:27017',
//             callback: (err, db) => {if(err) console.log("import error: ", err)}
//         }
//         mongoImport(config);
//     })
//     .catch(err => console.log(err))


server.get('/whatever', function (req, res) {
  res.send('Hello World')
})


server.get('/devices', function (req, res) {
  res.send('This route will return all panocean all devices')
})


server.use(express.json());

server.listen(3000, function () {
  console.log(`server running on port 3000`)
})