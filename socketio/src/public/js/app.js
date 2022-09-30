const socket = io();

const $robby = document.getElementById('robby');
const $form = $robby.querySelector('form');
const $room = document.getElementById('room');

$room.hidden = true;

let roomName;

const enterRoom = () => {
  $robby.hidden = true;
  $room.hidden = false;
  const $h3 = $room.querySelector('h3');
  const $form = $room.querySelector('form');
  $h3.innerText = `Room Name: ${roomName}`;
  $form.addEventListener('submit', handleMessageSubmit);
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

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const $input = $room.querySelector('input');
  const value = $input.value;
  socket.emit('newMessage', $input.value, roomName, () => {
    sendMessage(`You: ${value}`);
  });
  $input.value = '';
};

$form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', () => sendMessage('someone joined 😀'));
socket.on('bye', () => sendMessage('someone left 😭'));
socket.on('newMessage', sendMessage);
