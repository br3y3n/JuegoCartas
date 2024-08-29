import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:7777');

const UnirsePresala = () => {
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleUnirse = async () => {
        try {
            const usuarioId = socket.id; 

            const response = await fetch('http://localhost:7777/presalas/unirse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ codigoPresala: codigo, usuarioId: usuarioId })
            });

            if (response.ok) {
                setMensaje('¡Te has unido a la sala!');
                socket.emit('unirsePresala', codigo); 
            } else {
                const result = await response.json();
                setMensaje(result.message || 'Error al unirse a la sala');
            }
        } catch (error) {
            console.error('Error de red', error);
            setMensaje('Error de red');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Código de la sala"
            />
            <button onClick={handleUnirse}>Unirse a la Presala</button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default UnirsePresala;
