const socket = io('http://localhost:80')
// get DOM element in respective js variables
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageImp')
const messageContainer = document.querySelector(".container")

// audio for palying receiving messages
var audio = new Audio('ting.mp3')
// function which will append to the event info 
const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if (position == 'left') {
        audio.play();
    }
}
// if the form gets submitted send server the message

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
// ask new user for his/her name and let the server know
const name = prompt("Enter Your Name To Join");
socket.emit('new-user-joined', name);
// if new user join receive his name from the server
socket.on('user-joined', name => {
    append(`${name}: join the chat`, 'right')

})
// if server sends a message receive it

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')

})

// if a user leaves the chat append the info to the container
socket.on('left', name => {
    append(`${name}: left the chat`, 'right')

})
