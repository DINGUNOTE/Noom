const socket = new WebSocket(`ws://${window.location.host}`);

const $ul = document.querySelector('ul');
const $form = document.querySelector('form');

socket.addEventListener('open', () => console.log('Connected to Server 😀'));

socket.addEventListener('message', (message) => {
  console.log('New Message: ', message.data, 'from the server');
});

socket.addEventListener('close', () =>
  console.log('Disconnected from Server 😭')
);

setTimeout(() => {
  socket.send('hello from the browser!');
}, 1000);

const handleSubmit = (event) => {
  event.preventDefault();
  const $input = $form.querySelector('input');
  socket.send($input.value);
  $input.value = '';
};

$form.addEventListener('submit', handleSubmit);
