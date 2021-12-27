// 여기는 프론트 엔드
// 서버와 브라우저 간의 연결(헷갈리지 말것)
const socket = new WebSocket(`ws://${window.location.host}`);

const messageUl = document.querySelector('ul');
const messageForm = document.querySelector('#msgForm');
const nickForm = document.querySelector('#nickForm');

socket.addEventListener('open', () => {
  console.log('Connected to the Server! OOO');
});
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  messageUl.append(li);
  li.innerText = message.data;
});
socket.addEventListener('close', () => {
  console.log('DisConnected to the Server! XXX');
});

function makeMessage(type, payload) {
  return { type, payload };
}

const handleMessage = (e) => {
  e.preventDefault();
  const Input = messageForm.querySelector('input');
  socket.send(JSON.stringify(makeMessage('new_message', Input.value)));
  Input.value = '';
};

const handleNick = (e) => {
  e.preventDefault();
  const Input = nickForm.querySelector('input');
  socket.send(JSON.stringify(makeMessage('nickname', Input.value)));
  Input.value = '';
};

messageForm.addEventListener('submit', handleMessage);
nickForm.addEventListener('submit', handleNick);

// setTimeout(() => {
//   socket.send('Hello from Front!');
// }, 5000);
