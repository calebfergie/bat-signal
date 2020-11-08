// // check if there is a success connected on the local net
// // set self up to recieve requests from other host site
// // exchange with socket
// function checkLocal() {
//
//
//
// // **********************************************************
// // INIT SOCKET.IO
//
// let init = () => {
// 
// 	var socket = io();
//
// 	socket.emit('admin', 'admin is connected');
// 	socket.on('userCount', function(userCount) {
//     console.log('total number of users online is: ' + userCount); //console number of users after one goes off;
// 	});
//
//     console.log("init done");
//
// // **********************************************************
// // WHEN RECEIVE DATA FROM SOCKET.IO, SEND THE DATA TO SERIALPORT
//
//   socket.on('toLocal', sendToLocal);
// 	// connectToSerialPort(portName);
//
// };
//
//
// // init a connection to socket.io server (heroku server)
// window.onload =init();
//
//
// checkLocal();
