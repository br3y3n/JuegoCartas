import PresalaModel from "../models/PreSala.js";

export const socketEvents = (io)=>{
    // socketEvents.js
   io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

  // Emitir las salas creadas al conectar un nuevo cliente
  try {
    const response = await PresalaModel.find()
    socket.emit('listarPartidas', response); // Emitir solo al cliente recién conectado
  } catch (error) {
    console.error('Error al listar partidas:', error);
  }

  socket.on('listarPartidas', async () => {
    try {
      const response = await PresalaModel.find();
      io.emit('listarPartidas', response); // Emitir a todos los clientes conectados
    } catch (error) {
      console.error('Error al listar partidas:', error);
    }
  });

  socket.on('crearPartida', async (data) => {
    try {
      // Agregar el ID del socket del usuario que creó la partida
      const partidaData = { ...data, socketId: socket.id };
      const response = await PresalaModel.create(partidaData);
      
      io.emit('partidaCreada', response); // Emitir a todos los clientes conectados
    } catch (error) {
      console.error('Error al crear partida:', error);
    }
  });

      socket.on('unirsePartida', (data) => {
        // Lógica para unirse a una partida existente
        console.log('Unirse a partida:', data);
      });
  
      socket.on('seleccionarDinamica', (data) => {
        // Lógica para seleccionar la dinámica del juego
        console.log('Dinámica seleccionada:', data);
      });
  
      socket.on('seleccionarCarta', (data) => {
        // Lógica para seleccionar una carta
        console.log('Carta seleccionada:', data);
      });
  
      socket.on('verificarGanador', (data) => {
        // Lógica para verificar el ganador de la ronda
        console.log('Verificando ganador:', data);
      });
  
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  };