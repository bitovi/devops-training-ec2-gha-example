var port = process.env.PORT || 3000;
var express = require('express');
var fs = require('fs');
var app = express();
const { Pool, Client } = require('pg')

app.get('/', async function (req, res) {
  console.log("received request", req.route.path);
  res.send(`Hello Bitovi Meetup - github-actions-deploy-docker-to-ec2`)
});
app.get('/postgres', async function (req, res) {
  console.log("received request", req.route.path);

  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PGDATABASE,
    ssl: {
      ca: fs.readFileSync('rds-combined-ca-bundle.pem').toString()
    }
  });
  client.connect()
  const result = await client.query('SELECT NOW()');
  await client.end();
  
  
  res.send(`Hello SQL timestamp: ${result.rows[0].now}`);
});

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
