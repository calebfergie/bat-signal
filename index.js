// Import the express lirbary
const express = require('express')
// Create a new express application and use
// the express static middleware, to serve all files
const app = express();
// Import the axios library, to make HTTP requests
const axios = require('axios')
// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '532df1b9054087083589'
const clientSecret = '8db60e07013b7c45b5e6cd80d62c8446caa01494' //ENVVVV

const http = require("http").Server(app);
const PORT = process.env.PORT || 3000;

// inside the public directory
app.use(express.static(__dirname + '/public'))

app.set('port', PORT);

// Get request to me from index.html
app.get('/', (req, res) => {
  console.log('user enters..')
  .then((response) => {
    res.render('index');
  })

  console.log("App is served on localhost: " + PORT);

});

var io = require('socket.io')(http);
io.on('user', function(socket) {
  console.log('user has connected');
  // On disconnect to socket
socket.on('disconnect', function() {
  console.log('user has disconnected');
})
socket.on('authWin', function(socket) {
  console.log('user is IN');
})
})

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
    res.redirect(`/welcome.html?access_token=${accessToken}`);

  })
})

app.get('/slave', (req, res) => {
  const v3 = require('node-hue-api').v3
    , discovery = v3.discovery
    , hueApi = v3.api;
  const model = require('node-hue-api').v3.model;

  const LightState = v3.lightStates.LightState;
  const USERNAME = '-kMVkteI-VJ2C8zI3fRzoqB4guO7KHBfFnc-n8Lf' //need to put in env
    // The name of the light we wish to retrieve by name
    , COLOR_GLOBE = 3
    , SENSOR = 10;

    v3.discovery.nupnpSearch()
    .then(searchResults => {
      const hub = searchResults[0].ipaddress;
      return v3.api.createLocal(hub).connect(USERNAME);
    })
    .then(api => {
          console.log("hell0");
          return api.lights.getLight(COLOR_GLOBE);
          })
    .then(result => {
      JSON.stringify(result);
      // console.log(`${result.toStringDetailed()}`);
      console.log(result);
      // const lightData = document.createTextNode(`Data Dump, ${result.toStringDetailed()}`)
      // document.body.appendChild(lightData);
      // io.emit("batStatus", `${result}`);
      res.redirect(`/slave.html`);

    })

});

function sendToLocal(outputString){
    console.log("sending: " + outputString);
  // serial.write(outputString+ '\n'); // write the value - add + '\n' if using arduino uno
}


    // v3.discovery.nupnpSearch()
    // .then(searchResults => {
    //   const host = searchResults[0].ipaddress;
    //   return v3.api.createLocal(host).connect(USERNAME);
    // })
    // .then(api => {
    //   // Get the daylight sensor for the bridge, at id 1
    //       console.log("hell0");
    //       return api.lights.getLight(COLOR_GLOBE);
    //       })
    // .then(result => {
    //   console.log(`${result.toStringDetailed()}`);
    //   socket.emit("batStatus", `${result}`);
    // })
// app.get('welcome.')

// Start the server on port 3000
http.listen(PORT)
// server.listen(port, () => console.log(`Listening on port ${port}`));
