const logoutBtn = document.getElementById("logout");
const messages = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById('newMessage');
const socket = io("ws://localhost:3333/");


const room = sessionStorage.getItem("room");
const username = sessionStorage.getItem("name");

socket.emit('select_room', {
  room,
  username
}, (previousMessages) => {
  previousMessages.forEach(message => {
    renderNewMessage(message);
  })
}
);



const displayRoom = ({ room, username }) => {

  const roomName = document.getElementById("roomName");
  roomName.innerHTML = `
    Hello ${username}!
    <span style="display: flex; gap: 8px;">
      Current room:
      <p style="text-decoration: underline;">
        ${room}
      </p>
    </span>
  `;
};


const renderNewMessage = (message) => {
  const messageInfo = document.createElement("span");
  messageInfo.classList.add("message-info");
  messageInfo.innerHTML = `
    <p class='name-info'>${message.name}</p>
    <p class='date-info'>${dayjs(message.createdAt).format("DD/MM/YYYY - HH:mm")}</p>
  `;

  const messageText = document.createElement("span");
  messageText.classList.add("message-text");
  messageText.innerHTML = `
    <p>${message.text}</p>
  `;

  const li = document.createElement("li");
  li.appendChild(messageInfo);
  li.appendChild(messageText);

  messages.appendChild(li);

  if (sessionStorage.getItem('id') === message.socketId) {
    li.classList.add("message-left");
  } else {
    li.classList.add("message-right");
  }
};

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("room");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("name");
  window.location.href = "/";
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!input.value) return;

  const newMessage = {
    name: sessionStorage.getItem("name"),
    createdAt: new Date().toLocaleString(),
    text: input.value,
    room: sessionStorage.getItem("room"),
  };

  socket.emit('message', newMessage);
  input.value = "";
});

socket.on('message', (data) => {
  sessionStorage.setItem('id', data.socketId)
  renderNewMessage(data);
});

window.addEventListener("load", () => {
  displayRoom({
    room,
    username
  });
});
