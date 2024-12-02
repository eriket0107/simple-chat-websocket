import { io } from './http'

type MessagesType = {
  name: string
  createdAt: Date,
  text: string
  room: string
  socketId: string
}

type RoomUser = {
  socketId: string
  name: string
  room: string
}
const users: RoomUser[] = []
const messages: MessagesType[] = []


const getMessages = (room: string) => {
  return messages.filter(message => message.room === room)
}

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('select_room', (data, callback) => {
    socket.join(data.room);
    const userInRoom = users.find(user => user.name === data.name && user.room === data.room)

    if (userInRoom) {
      userInRoom.socketId = socket.id
    } else {
      users.push({
        socketId: socket.id,
        name: data.name,
        room: data.room
      })
    }
    const previousMessages = getMessages(data.room);

    callback(previousMessages)
  });



  socket.on('message', (data) => {
    const message: MessagesType = {
      socketId: socket.id,
      name: data.name,
      createdAt: new Date(),
      text: data.text,
      room: data.room
    }

    messages.push(message);

    io.to(data.room).emit('message', message);
  });

});