import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on https://localhost:3000/`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on('connection', (socket) => {
  socket['nickname'] = 'Anonymous';
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  // 채팅 방에 입장했을 때
  socket.on('enterRoom', (nickname, roomName, done) => {
    socket.join(roomName);
    socket['nickname'] = nickname;
    done();
    socket.to(roomName).emit('welcome', socket.nickname);
  });

  // 새 메세지를 보낼 때
  socket.on('newMessage', (message, room, done) => {
    socket.to(room).emit('newMessage', `${socket.nickname}: ${message}`);
    done();
  });

  // 채팅 방을 나갔을 때
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname)
    );
  });

  // 닉네임 변경했을 때
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});

httpServer.listen(3000, handleListen);
