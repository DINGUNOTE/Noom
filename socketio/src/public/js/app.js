const socket = io();

const $robby = document.getElementById('robby');
const $form = $robby.querySelector('form');
const $room = document.getElementById('room');

$room.hidden = true;

let nickname, roomName;

const enterRoom = () => {
  $robby.hidden = true;
  $room.hidden = false;
  const roomTitle = $room.querySelector('h3');
  const messageForm = $room.querySelector('#message');
  roomTitle.innerText = `Room Name: ${roomName}`;
  messageForm.addEventListener('submit', handleMessageSubmit);
};

const sendMessage = (msg) => {
  const $ul = $room.querySelector('ul');
  const $li = document.createElement('li');

  $li.innerText = msg;
  $ul.appendChild($li);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();

  const $nickname = $form.querySelector('#nickname');
  const $roomName = $form.querySelector('#roomName');

  socket.emit('enterRoom', $nickname.value, $roomName.value, enterRoom);

  nickname = $nickname.value;
  roomName = $roomName.value;

  $nickname.value = '';
  $roomName.value = '';
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
  socket.emit('newMessage', value, roomName, () => {
    sendMessage(`You: ${value}`);
  });
  $input.value = '';
};

$form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  sendMessage(`${user} joined 😀`);
  const roomTitle = $room.querySelector('h3');
  roomTitle.innerText = `Room Name: ${roomName} (${newCount})`;
});
socket.on('bye', (user, newCount) => {
  sendMessage(`${user} left 😭`);
  const roomTitle = $room.querySelector('h3');
  roomTitle.innerText = `Room Name: ${roomName} (${newCount})`;
});
socket.on('newMessage', sendMessage);

// room 갯수를 체크해서 화면에 표시
socket.on('roomChange', (rooms) => {
  const roomList = $robby.querySelector('ul');

  roomList.innerHTML = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const $li = document.createElement('li');
    $li.innerText = room;
    roomList.append($li);
  });
});
