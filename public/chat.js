//Make connection
var socket = io.connect('http://localhost:4000')

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('btn');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit Events

btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

//Broadcast Message
message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});

//Listen for Events
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ': </em> is Typing a message...</p>';
});
