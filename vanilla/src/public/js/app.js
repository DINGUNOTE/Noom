const socket = new WebSocket(`ws://${window.location.host}`);

const chatList = document.querySelector('ul');
const nicknameForm = document.querySelector('#nickname');
const messageForm = document.querySelector('#message');

socket.addEventListener('open', () => console.log('Connected to Server 😀'));

socket.addEventListener('message', (message) => {
  const chat = document.createElement('li');
  chat.innerText = message.data;

  chatList.append(chat);

  console.log('New Message: ', message.data, 'from the server');
});

socket.addEventListener('close', () =>
  console.log('Disconnected from Server 😭')
);

const makeMessage = (type, payload) => {
  const msg = { type, payload };

  return JSON.stringify(msg);
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const $input = nicknameForm.querySelector('input');
  socket.send(makeMessage('nickname', $input.value));
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const $input = messageForm.querySelector('input');
  socket.send(makeMessage('newMessage', $input.value));
  $input.value = '';
};

nicknameForm.addEventListener('submit', handleNicknameSubmit);
messageForm.addEventListener('submit', handleMessageSubmit);
