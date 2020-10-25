var socket = io.connect("http://localhost:3000");
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var output = document.getElementById("output");
var btn = document.getElementById("send");
btn.addEventListener("click", function(){
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  // emits a message down the WebSocket to the server
  // now listen for the message at the server side (index.js)
});
//listen for the event from the server
socket.on("chat", function(data){
  output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>"
});
