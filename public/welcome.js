function sendToHQ(outputString){
    console.log("sending: " + outputString);
    socket.emit("got it");
  // serial.write(outputString+ '\n'); // write the value - add + '\n' if using arduino uno
}

// **********************************************************
// INIT SOCKET.IO

let init = () => {

	var socket = io();

	socket.emit('user', 'new user is connected');
	socket.on('userCount', function(userCount) {
    console.log('total number of users online is: ' + userCount); //console number of users after one goes off;
	});

    console.log("init done");

// **********************************************************
// WHEN RECEIVE DATA FROM SOCKET.IO, SEND THE DATA TO SERIALPORT

  socket.on('connection', sendToHQ);
  //
	// connectToSerialPort(portName);

};


// init a connection to socket.io server (heroku server)
window.onload =init();
