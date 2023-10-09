var port = process.env.PORT || 3001;
var express = require('express');
var app = express();

app.get('/api/', function (req, res) {
  res.send("Hello world!");
});

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
