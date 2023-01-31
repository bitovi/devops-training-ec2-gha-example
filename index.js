var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
const { Pool, Client } = require('pg')

// Set env vars for postgres
process.env['PG_USER'] = process.env['POSTGRES_CLUSTER_MASTER_USERNAME'];
process.env['PG_PASSWORD'] = process.env['POSTGRES_CLUSTER_MASTER_PASSWORD'];
process.env['PGDATABASE'] = process.env['POSTGRES_CLUSTER_DATABASE_NAME'];
process.env['PGPORT'] = process.env['POSTGRES_CLUSTER_PORT'];


app.get('/', function (req, res) {
  const client = new Client();
  const postgresNow = await client.query('SELECT NOW()');
  await client.end();
  res.send(`Hello Bitovi Meetup - github-actions-deploy-docker-to-ec2
<br />
SQL timestamp: ${postgresNow}`);
  });

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
