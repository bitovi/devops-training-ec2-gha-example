var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
// const { Pool, Client } = require('pg')

app.get('/', async function (req, res) {
  console.log("received request", req);
  // const client = new Client();
  // const postgresNow = await client.query('SELECT NOW()');
  // await client.end();
  res.send(`Hello Bitovi Meetup - github-actions-deploy-docker-to-ec2`)
//   res.send(`Hello Bitovi Meetup - github-actions-deploy-docker-to-ec2
// <br />
// SQL timestamp: ${postgresNow}`);
  });

app.listen( port, function () {
  console.log(`Listening on port ${port}!`);
});
