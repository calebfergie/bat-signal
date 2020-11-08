
// Import the express lirbary
const express = require('express')
// Create a new express application and use
// the express static middleware, to serve all files
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// Import the axios library, to make HTTP requests
const axios = require('axios')
// This is the client ID and client secret that you obtained
// while registering the application
const clientID = process.env.GH_CLIENT_ID
const clientSecret = process.env.GH_CLIENT_SECRET //ENVVVV
const PORT = process.env.PORT || 3000;
var http = require('http').createServer(app);

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// inside the public directory
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));
console.log(`client ID ${clientID}`)


app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    if (accessToken !=undefined){
    res.redirect(`/welcome.html?access_token=${accessToken}`);
} else {
    res.json(response);
  }
  })
})

app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/local/', (req, res) => {
  const io = require('socket.io')(http);
  const v3 = require('node-hue-api').v3
    , discovery = v3.discovery
    , hueApi = v3.api;
  const model = require('node-hue-api').v3.model;

async function getBridge() {
  const results = await v3.discovery.nupnpSearch();

  // Results will be an array of bridges that were found
  console.log(JSON.stringify(results, null, 2));
}

getBridge();
// serve(req, res, finalhandler(req, res));

//   const LightState = v3.lightStates.LightState;
//   const USERNAME = process.env.HUE_CLIENT
//     // The name of the light we wish to retrieve by name
//     , COLOR_GLOBE = 3
//     , SENSOR = 10;
//
//     // function checkLocal(hub) {
//     //   v3.discovery.nupnpSearch()
//     //     .then(searchResults => {
//     //       return v3.api.createLocal(hub).connect(USERNAME);
//     //     })
//     //       .then(api => {
//     //             // console.log(api);
//     //             return api.configuration.getConfiguration();
//     //             })
//     //     .then(config => {
//     //       JSON.stringify(config, null, 2);
//     //
//     //       return config;
//     //     })
//     // }
//
// //light status
//   v3.discovery.nupnpSearch()
//     .then(searchResults => {
//       console.log(searchResults);
//       const hub = searchResults[0].ipaddress;
//       const hubName = searchResults[0].name;
//       return v3.api.createLocal(hub).connect(USERNAME);
//     })
//       .then(api => {
//             // console.log(api);
//             return api.lights.getLight(COLOR_GLOBE);
//             })
//     .then(result => {
//       JSON.stringify(result, null, 2);
//       // console.log(`${result.toStringDetailed()}`);
//       // console.log(result);
//       console.log("Emitting Bat Status: " + result)
//       io.emit("batStatus", `${result}`);
//       res.json(result);
//     })
});
