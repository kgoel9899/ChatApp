var socket = io.connect("http://localhost:3000");
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var output = document.getElementById("output");
var btn = document.getElementById("send");
var feedback = document.getElementById("feedback");
btn.addEventListener("click", function(){
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  // emits a message down the WebSocket to the server
  // now listen for the message at the server side (index.js)
});
message.addEventListener("keypress", function(){
  socket.emit("typing", handle.value);
});
//listen for the event from the server
socket.on("chat", function(data){
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>"
  feedback.innerHTML = "";
});
socket.on("typing", function(data){
  feedback.innerHTML = "<p><em>" + data + "is typing a message..." + "</em></p>";
});
