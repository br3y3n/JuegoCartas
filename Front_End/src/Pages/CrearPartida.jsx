import { useEffect, useState } from "react";
import socket from "../Config/SocketIo";
import { generarCodigoAleatorio } from "../utils/generarCodigo";
import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "../Components/SideBar";
import { SalaPrivada } from "../Components/SalaPrivada";

export const CrearPartida = () => {
    const [partida, setPartida] = useState(null)
    const [partidas, setPartidas] = useState()
    const [modal, setModal] = useState(false)
    const codigo = generarCodigoAleatorio(6)
    const navigate =useNavigate()
    // Ejemplo de cómo emitir un evento
    useEffect(() => {
        // Conectar al servidor de sockets
        socket.on('connect', () => {
          console.log('Conectado al servidor');
          socket.emit('listarPartidas');
        });
    
        socket.on('disconnect', () => {
          console.log('Desconectado del servidor');
        });
    
        // Escuchar evento de partida creada
        socket.on('partidaCreada', (data) => {
          console.log('Partida creada:', data);
          setPartidas((prevPartidas) => [...prevPartidas, data]); // Agregar nueva partida a la lista
    
          // Navegar solo si el usuario creó la partida
          if (data.socketId === socket.id) { 
            setPartida(data);
            navigate(`/presala/${data.codigo}`);
          }
        });
    
        // Escuchar evento de listar partidas
        socket.on('listarPartidas', (data) => {
          console.log('Partidas recibidas:', data);
          setPartidas(data);
        });
    
        // Limpieza al desmontar el componente
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('partidaCreada');
          socket.off('listarPartidas');
        };
      }, []);
    
      const crearPartida = (data) => {
        socket.emit('crearPartida', { ...data, creador: socket.id });
      };

      const HandleModal =()=>{
        setModal(!modal)
      }
  return (
    <div className="flex mt-5 gap-10 bg-slate-50 h-screen">
     <SideBar/>
     <section className="">
     <button 
     className="bg-black text-white p-3 rounded-lg font-semibold drop-shadow-md shadow-md "
     onClick={() => crearPartida({ usuario: 'Partida 1', codigo: codigo})}>
        Crear Partida
      </button>

      <button
      className="bg-black text-white p-3 rounded-lg font-semibold drop-shadow-md shadow-md ml-10"
      onClick={()=> HandleModal()}
      >
        Sala Privada
      </button>

      <div className="flex gap-10">
        {partidas && partidas.map((partida, index)=>(
            <div className="shadow-lg p-5 rounded-md mt-5" key={index}>
                <h1 className="text-slate-600">Patida del usuario: {partida.usuario}</h1>
                <h1 className="text-slate-600 mt-3">codigo: {partida.codigo}</h1>
                <button className="bg-black text-white p-3 rounded-lg font-semibold drop-shadow-md shadow-md mt-5">
                    <Link to={`/presala/${partida.codigo}`}>Unirme</Link>
                </button>
            </div>
        ))}
      </div>
     </section>
     <SalaPrivada modal={modal} />
    </div>
  )
}
