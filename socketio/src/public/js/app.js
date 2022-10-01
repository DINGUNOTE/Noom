const socket = io();

const $robby = document.getElementById('robby');
const $form = $robby.querySelector('form');
const $room = document.getElementById('room');

$room.hidden = true;

let roomName;

const enterRoom = () => {
  $robby.hidden = true;
  $room.hidden = false;
  const roomTitle = $room.querySelector('h3');
  const messageForm = $room.querySelector('#message');
  const nicknameForm = $room.querySelector('#nickname');
  roomTitle.innerText = `Room Name: ${roomName}`;
  messageForm.addEventListener('submit', handleMessageSubmit);
  nicknameForm.addEventListener('submit', handleNicknameSubmit);
};

const sendMessage = (msg) => {
  const $ul = $room.querySelector('ul');
  const $li = document.createElement('li');
  $li.innerText = msg;
  $ul.appendChild($li);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const $input = $form.querySelector('input');
  socket.emit('enterRoom', $input.value, enterRoom);
  roomName = $input.value;
  $input.value = '';
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const $input = $room.querySelector('#nickname input');
  socket.emit('nickname', $input.value);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const $input = $room.querySelector('#message input');
  const value = $input.value;
  socket.emit('newMessage', $input.value, roomName, () => {
    sendMessage(`You: ${value}`);
  });
  $input.value = '';
};

$form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user) => sendMessage(`${user} joined 😀`));
socket.on('bye', (user) => sendMessage(`${user} left 😭`));
socket.on('newMessage', sendMessage);
