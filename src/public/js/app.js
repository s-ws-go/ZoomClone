// socket io 설치를 통해 브라우저에서 io 함수를 사용할 수 있게 됨
const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', { payload: input.value }, 1, false, 'string', () => {
    console.log('server is done!');
  });
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);
