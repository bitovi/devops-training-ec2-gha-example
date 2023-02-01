var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
const { Pool, Client } = require('pg')


// const client = new Client({
//   host: process.env["PGHOST"],
//   port: process.env["PGPORT"],
//   user: process.env["PG_USER"],
//   password: process.env["PG_PASSWORD"]
// });
const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD
});


app.get('/', async function (req, res) {
  console.log("received request", req.route.path);
  res.send(`Hello Bitovi Meetup - github-actions-deploy-docker-to-ec2`)
});
app.get('/postgres', async function (req, res) {
  console.log("received request", req.route.path);
  client.connect()
  const postgresNow = await client.query('SELECT NOW()');
  await client.end();
  res.send(`Hello SQL timestamp: ${postgresNow}`);
});

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
