// 여기는 프론트 엔드

// 서버와 브라우저 간의 연결(헷갈리지 말것)
const socket = new WebSocket(`ws://${window.location.host}`);

const messageUl = document.querySelector('ul');
const messageForm = document.querySelector('form');

socket.addEventListener('open', () => {
  console.log('Connected to the Server! OOO');
});
socket.addEventListener('message', (message) => {
  console.log(message);
  console.log(`Data from Server : ${message.data}`);
});
socket.addEventListener('close', () => {
  console.log('DisConnected to the Server! XXX');
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const Input = messageForm.querySelector('input');
  socket.send(Input.value);
  Input.value = '';
});

// setTimeout(() => {
//   socket.send('Hello from Front!');
// }, 5000);
