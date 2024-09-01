// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:7777"); // Asegúrate de que la URL coincida con la de tu servidor

export default socket;
