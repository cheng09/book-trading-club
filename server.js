'use strict';
var path = require('path');
var express = require('express');

var search = require('./server/books');

var app = express();

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', function(req, res) {
   res.sendFile('/index.html');
});

app.get('/api/search/:term', search);

var port = process.env.PORT || 3000

app.listen(port, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening on " + port);
});