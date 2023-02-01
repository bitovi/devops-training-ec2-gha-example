var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
const { Pool, Client } = require('pg')

app.get('/', async function (req, res) {
  console.log("received request", req.route.path);
  res.send(`Hello Bitovi Meetup - github-actions-deploy-docker-to-ec2`)
});
app.get('/postgres', async function (req, res) {
  console.log("received request", req.route.path);
  const client = new Client();
  client.connect()
  const postgresNow = await client.query('SELECT NOW()');
  await client.end();
  res.send(`Hello SQL timestamp: ${postgresNow}`);
});

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
