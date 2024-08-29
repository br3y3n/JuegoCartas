import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const socket = io('http://localhost:7777'); 

const Presala = () => {
  const [message, setMessage] = useState('');
  const [gameUpdates, setGameUpdates] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');

      socket.emit('jugarCarta', 'as de trébol');
    });

    //socket.on('codigoSala', (code) =>)

    socket.on('mensaje', (data) => {
      setMessage(data);
    });

    socket.on('actualizarJuego', (carta) => {
      setGameUpdates(`Carta actualizada: ${carta}`);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });

    return () => {
      socket.off('connect');
      socket.off('mensaje');
      socket.off('actualizarJuego');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <h1>Socket.IO en React</h1>
      <p>Mensaje del servidor: {message}</p>
      <p>Actualización del juego: {gameUpdates}</p>
    </div>
  );
};

export default Presala;
