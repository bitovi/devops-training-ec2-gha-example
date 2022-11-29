var port = process.env.PORT || 3000;
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("Hello World - Meetup Rehearsal");
});

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
