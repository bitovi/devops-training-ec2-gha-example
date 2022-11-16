var port = process.env.PORT || 3000;
var express = require('express');
var app = express();

const content = () => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Bitovi DevOps Training - GitHub Action - App to EC2</title>
  </head>
  
  <body>
      <h1>Hello from branch: main</h1>
  </body>
  </html>
  `
}
app.get('/', function (req, res) {
  res.send("Hello World");
});

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});