import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on https://localhost:3000/`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

// 서버에서 public room만 반환
const publicRooms = () => {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });

  return publicRooms;
};

const countRoom = (roomName) => {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
};

wsServer.on('connection', (socket) => {
  socket['nickname'] = 'Anonymous';
  socket.onAny((event) => {
    console.log(wsServer.sockets.adapter);
    console.log(`Socket Event: ${event}`);
  });

  // 채팅 방에 입장했을 때
  socket.on('enterRoom', (nickname, roomName, done) => {
    socket.join(roomName);
    socket['nickname'] = nickname;
    done();
    socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));
    wsServer.sockets.emit('roomChange', publicRooms()); // public room 목록을 갱신해서 프론트엔드로 전달
  });

  // 새 메세지를 보낼 때
  socket.on('newMessage', (message, room, done) => {
    socket.to(room).emit('newMessage', `${socket.nickname}: ${message}`);
    done();
  });

  // 채팅 방을 떠나기 직전에
  socket.on('disconnecting', () => {
    socket.rooms.forEach(
      (room) =>
        socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1) // 아직 방을 떠나기 전이기 때문에 현재의 방을 빼기 위해서 -1
    );
  });

  // 채팅방을 떠났을 때
  socket.on('disconnect', () => {
    wsServer.sockets.emit('roomChange', publicRooms()); // public room 목록을 갱신해서 프론트엔드로 전달
  });

  // 닉네임 변경했을 때
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});

httpServer.listen(3000, handleListen);
