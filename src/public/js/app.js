// socket io 설치를 통해 브라우저에서 io 함수를 사용할 수 있게 됨
const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');
const room = document.querySelector('#room');

room.hidden = true;

let roomName;

const addMessage = (message) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = '';
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector('#name input');
  socket.emit('nickname', input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h2 = room.querySelector('h2');
  h2.innerText = `Room ${roomName}`;
  const form = room.querySelector('form');
  form.addEventListener('submit', handleMessageSubmit);
  const msgForm = room.querySelector('#msg');
  const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', handleMessageSubmit);
  nameForm.addEventListener('submit', handleNicknameSubmit);
};

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user) => {
  addMessage(`${user} arrived!`);
});

socket.on('bye', (user) => {
  addMessage(`${user} left....`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.appendChild(li);
  });
});
