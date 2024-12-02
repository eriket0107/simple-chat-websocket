import express from "express";
import http from "http";
import path from "node:path";
import cors from "cors"
import { Server } from "socket.io";

const app = express();


const serverHttp = http.createServer(app);
const io = new Server(serverHttp);


app.use(express.static(path.join(__dirname, "..", 'public'),))
app.use(cors({
  origin: "*"
}))


app.get('/', (_, res) => {
  res.sendFile('index.html')
})

export { io, serverHttp }