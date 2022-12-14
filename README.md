## 📌 Project

- [프레임워크 없이 WebSocket으로 실시간 채팅 구현](https://github.com/DINGUNOTE/Noom/tree/main/vanilla)
- [SocketIO를 사용해서 실시간 채팅 구현](https://github.com/DINGUNOTE/Noom/tree/main/socketio)

## 🤔 HTTP VS WebSocket

<img style="display:block;margin:0 auto;" src="https://blog.scaleway.com/content/images/2021/02/websockets-bigger-4.png">
<p style="text-align:center;">https://blog.scaleway.com/iot-hub-what-use-case-for-websockets/</p>

- `HTTP`는 유저가 Request 할 때마다 서버에서 Response 해온다. Response 이후 서버는 유저를 잊어버린다. 즉 유저와 백엔드 사이에 아무런 연결이 없다.(`stateless`)
- `WebSocket`은 Request를 서버에서 Accept하면 서로 양방향으로 연결된다. 이후에 실시간으로 언제든지 서버가 유저에게 메세지를 보낼 수 있고, 유저가 서버에 메세지를 보낼 수 있다.

## 💡 ws

- Node.js를 위한 WebSocket 프로토콜을 실행하는 core 패키지

## 💡 SOCKET.IO

- 프론트와 백엔드 간에 실시간으로 양방향, 이벤트 기반의 통신 기능을 쉽게 만들어주는 프레임워크
- SocketIO는 WebSocket의 부가기능이 아니라 SocketIO가 통신을 제공하는 방법 중 하나다.
- 만약 WebSocket을 지원하지 않는 경우, HTTP long polling 등을 사용한다.

  ### io()

  - 자동으로 백엔드 socket.io와 연결해주는 function
  - 알아서 socket.io를 실행하고 있는 서버를 찾는다.

  ### socket.emit()

  - 이벤트를 전달하기 위해서 사용되는 function
  - 첫 번째 인자로 이벤트 명, 두 번째 인자부터 보내고 싶은 payload, 마지막 인자로 함수가 들어가게 된다면, 그 함수는 서버에서 호출하는 callback function이 된다.
  - 전달 된 콜백 함수는 백엔드에서 호출된 후에 프론트엔드에서 실행된다. (백엔드에서 실행은 X)

  ### server.sockets.emit()

  - 모든 클라이언트에 메세지를 보낼 때 사용

  ### socket.onAny(callback)

  - 모든 이벤트를 수신할 수 있다.

  ### Adapter

  - 다른 서버들 사이에 실시간 어플리케이션을 동기화한다.
  - 이벤트가 모든 클라이언트로 올바르게 라우팅되도록 하기 위해서 사용한다.
  - 현재 sids(socket의 아이디들), rooms 등의 정보를 알 수 있다.

  ### Admin UI

  - @socket.io/admin-ui를 설치하게 되면 현재 SocketIO 서버의 서버 상태와 클라이언트 목록, 방의 목록, 소켓들의 상태와 발생된 이벤트들을 확인하고 제어할 수 있다.

  ```bash
  npm i @socket.io/admin-ui
  ```

  ```javascript
  const { createServer } = require('http');
  const { Server } = require('socket.io');
  const { instrument } = require('@socket.io/admin-ui');

  const httpServer = createServer();

  const io = new Server(httpServer, {
    cors: {
      origin: ['https://admin.socket.io'],
      credentials: true,
    },
  });

  instrument(io, {
    auth: false,
  });

  httpServer.listen(3000);
  ```

## 💡 WebRTC

## 📌 Reference

> [https://nomadcoders.co/noom/](https://nomadcoders.co/noom/)
