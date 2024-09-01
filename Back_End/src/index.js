import express from "express";
import cors from 'cors';
import routerUsuario from "./routes/usuario.js";
import http from 'http';
import { Server } from "socket.io";
import { socketEvents } from "./socket_io/socketEvents.js";
import mongoose from "mongoose";
const app = express();

mongoose.connect('mongodb://localhost:27017/cardgame', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use('/usuario', routerUsuario);

const server = http.createServer(app);
const io = new Server(server);

socketEvents(io);

const PORT = 7777;
server.listen(PORT, () => {
    console.log(`Server working properly on port ${PORT}`);
});
