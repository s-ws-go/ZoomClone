//여기는 백엔드

import http from 'http';
// import WebSocket from 'ws';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wsServer = SocketIO(server);

wsServer.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit('welcome');
  });
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => socket.to(room).emit('bye'));
  });
  socket.on('new_message', (msg, room, done) => {
    socket.to(room).emit('new_message', msg);
    done();
  });
});

// const wss = new WebSocket.Server({ server });

// //브라우저 종류 구분
// const sockets = [];

// // 서버 안에서 http 와 wss 서버간의 연결
// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = 'Anonymous';
//   console.log('..Connect to the Browser');
//   socket.on('close', () => {
//     console.log('..DisConnect from the Browser');
//   });
//   socket.on('message', (msg) => {
//     const message = JSON.parse(msg.toString());
//     if (message.type === 'new_message') {
//       sockets.forEach((aSocket) => {
//         aSocket.send(`${socket.nickname} : ${message.payload}`);
//       });
//     } else if (message.type === 'nickname') {
//       socket['nickname'] = message.payload;
//     }
//   });
// });

server.listen(3000, handleListen);

// 닉네임을 입력할 수 있는 form 또한 만들어 준다
// submit 때 보내줄 message가 채팅메세지인지 닉네임인지 구분되지 않은채로 프론트 -> 서버로 전달된다
// type와 payload를 각각 nickname, message (타입) 설정하고 payload에 값을 대응하면 되는데,
// send 메서드는 string만을 보낼 수 있다. --> Json으로 바꿔서 전송토록 해 보자.

// socket은 객체이기 떄문에 데이터를 저장할 수 있다.
// 이를 이용해 닉네임 정보 저장하여 프론트에 쏴줌
