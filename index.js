var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000, function(){
  console.log("listening to port 3000");
});
app.use(express.static("public"));
var io = socket(server); //at the backend server side
//need to use socket.io both sides backend and frontend
io.on("connection", function(socket){
  console.log("socket connection made", socket.id);
  //listen for chat message sent to us by client
  //here socket refers to that socket bw client and serve which is sending the message
  socket.on("chat", function(data){
    io.sockets.emit("chat", data); //send to all the clients
  });
  //now listen for the event in front end (data sent by the server)
  //after that listen for the typing message
  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data);
  });
});
