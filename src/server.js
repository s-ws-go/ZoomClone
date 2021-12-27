//여기는 백엔드

import http from 'http';
import WebSocket from 'ws';

import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 서버 안에서 http 와 wss 서버간의 연결
wss.on('connection', (socket) => {
  //wss 서버가 ㅇ니라, socket에 있는 메서드 사용 가능하다.
  console.log('..Connect to the Browser');
  socket.on('close', () => {
    console.log('..DisConnect from the Browser');
  });
  socket.on('message', (message) => {
    console.log(`This Is Front-Message : ${message}`);
  });
  socket.send('Hello from Server to the Browser!!');
});

server.listen(3000, handleListen);
