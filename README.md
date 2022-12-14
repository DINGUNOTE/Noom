## ๐ Project

- [ํ๋ ์์ํฌ ์์ด WebSocket์ผ๋ก ์ค์๊ฐ ์ฑํ ๊ตฌํ](https://github.com/DINGUNOTE/Noom/tree/main/vanilla)
- [SocketIO๋ฅผ ์ฌ์ฉํด์ ์ค์๊ฐ ์ฑํ ๊ตฌํ](https://github.com/DINGUNOTE/Noom/tree/main/socketio)

## ๐ค HTTP VS WebSocket

<img style="display:block;margin:0 auto;" src="https://blog.scaleway.com/content/images/2021/02/websockets-bigger-4.png">
<p style="text-align:center;">https://blog.scaleway.com/iot-hub-what-use-case-for-websockets/</p>

- `HTTP`๋ ์ ์ ๊ฐ Request ํ  ๋๋ง๋ค ์๋ฒ์์ Response ํด์จ๋ค. Response ์ดํ ์๋ฒ๋ ์ ์ ๋ฅผ ์์ด๋ฒ๋ฆฐ๋ค. ์ฆ ์ ์ ์ ๋ฐฑ์๋ ์ฌ์ด์ ์๋ฌด๋ฐ ์ฐ๊ฒฐ์ด ์๋ค.(`stateless`)
- `WebSocket`์ Request๋ฅผ ์๋ฒ์์ Acceptํ๋ฉด ์๋ก ์๋ฐฉํฅ์ผ๋ก ์ฐ๊ฒฐ๋๋ค. ์ดํ์ ์ค์๊ฐ์ผ๋ก ์ธ์ ๋ ์ง ์๋ฒ๊ฐ ์ ์ ์๊ฒ ๋ฉ์ธ์ง๋ฅผ ๋ณด๋ผ ์ ์๊ณ , ์ ์ ๊ฐ ์๋ฒ์ ๋ฉ์ธ์ง๋ฅผ ๋ณด๋ผ ์ ์๋ค.

## ๐ก ws

- Node.js๋ฅผ ์ํ WebSocket ํ๋กํ ์ฝ์ ์คํํ๋ core ํจํค์ง

## ๐ก SOCKET.IO

- ํ๋ก ํธ์ ๋ฐฑ์๋ ๊ฐ์ ์ค์๊ฐ์ผ๋ก ์๋ฐฉํฅ, ์ด๋ฒคํธ ๊ธฐ๋ฐ์ ํต์  ๊ธฐ๋ฅ์ ์ฝ๊ฒ ๋ง๋ค์ด์ฃผ๋ ํ๋ ์์ํฌ
- SocketIO๋ WebSocket์ ๋ถ๊ฐ๊ธฐ๋ฅ์ด ์๋๋ผ SocketIO๊ฐ ํต์ ์ ์ ๊ณตํ๋ ๋ฐฉ๋ฒ ์ค ํ๋๋ค.
- ๋ง์ฝ WebSocket์ ์ง์ํ์ง ์๋ ๊ฒฝ์ฐ, HTTP long polling ๋ฑ์ ์ฌ์ฉํ๋ค.

  ### io()

  - ์๋์ผ๋ก ๋ฐฑ์๋ socket.io์ ์ฐ๊ฒฐํด์ฃผ๋ function
  - ์์์ socket.io๋ฅผ ์คํํ๊ณ  ์๋ ์๋ฒ๋ฅผ ์ฐพ๋๋ค.

  ### socket.emit()

  - ์ด๋ฒคํธ๋ฅผ ์ ๋ฌํ๊ธฐ ์ํด์ ์ฌ์ฉ๋๋ function
  - ์ฒซ ๋ฒ์งธ ์ธ์๋ก ์ด๋ฒคํธ ๋ช, ๋ ๋ฒ์งธ ์ธ์๋ถํฐ ๋ณด๋ด๊ณ  ์ถ์ payload, ๋ง์ง๋ง ์ธ์๋ก ํจ์๊ฐ ๋ค์ด๊ฐ๊ฒ ๋๋ค๋ฉด, ๊ทธ ํจ์๋ ์๋ฒ์์ ํธ์ถํ๋ callback function์ด ๋๋ค.
  - ์ ๋ฌ ๋ ์ฝ๋ฐฑ ํจ์๋ ๋ฐฑ์๋์์ ํธ์ถ๋ ํ์ ํ๋ก ํธ์๋์์ ์คํ๋๋ค. (๋ฐฑ์๋์์ ์คํ์ X)

  ### server.sockets.emit()

  - ๋ชจ๋  ํด๋ผ์ด์ธํธ์ ๋ฉ์ธ์ง๋ฅผ ๋ณด๋ผ ๋ ์ฌ์ฉ

  ### socket.onAny(callback)

  - ๋ชจ๋  ์ด๋ฒคํธ๋ฅผ ์์ ํ  ์ ์๋ค.

  ### Adapter

  - ๋ค๋ฅธ ์๋ฒ๋ค ์ฌ์ด์ ์ค์๊ฐ ์ดํ๋ฆฌ์ผ์ด์์ ๋๊ธฐํํ๋ค.
  - ์ด๋ฒคํธ๊ฐ ๋ชจ๋  ํด๋ผ์ด์ธํธ๋ก ์ฌ๋ฐ๋ฅด๊ฒ ๋ผ์ฐํ๋๋๋ก ํ๊ธฐ ์ํด์ ์ฌ์ฉํ๋ค.
  - ํ์ฌ sids(socket์ ์์ด๋๋ค), rooms ๋ฑ์ ์ ๋ณด๋ฅผ ์ ์ ์๋ค.

  ### Admin UI

  - @socket.io/admin-ui๋ฅผ ์ค์นํ๊ฒ ๋๋ฉด ํ์ฌ SocketIO ์๋ฒ์ ์๋ฒ ์ํ์ ํด๋ผ์ด์ธํธ ๋ชฉ๋ก, ๋ฐฉ์ ๋ชฉ๋ก, ์์ผ๋ค์ ์ํ์ ๋ฐ์๋ ์ด๋ฒคํธ๋ค์ ํ์ธํ๊ณ  ์ ์ดํ  ์ ์๋ค.

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

## ๐ก WebRTC

## ๐ Reference

> [https://nomadcoders.co/noom/](https://nomadcoders.co/noom/)
