import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import routerUsuario from './routes/usuario.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuario', routerUsuario);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
});

// Manejo de la conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.emit('mensaje', 'Bienvenido a Pokemon trade card game!');

    socket.on('jugarCarta', (carta) => {
        console.log(carta);
        io.emit('actualizarJuego', carta);
    });
    socket.on('unirsePresala', (code) => {
        console.log(`Se une a la sala ${code}`);
        io.emit('mesanjePresala', 'Bienvenido a la sala')
        
    })
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

app.get('/', (req, res) => {
    res.send('Servidor HTTP con Socket.IO está funcionando!');
});

const PORT = process.env.PORT || 7777;
server.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en http://localhost:${PORT}`);
});
