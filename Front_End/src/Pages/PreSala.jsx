import React, { useState } from 'react'
import { UsuarioPresala } from '../Components/UsuarioPresala'
import { useNavigate } from 'react-router-dom'
import { generarCodigoAleatorio } from '../utils/generarCodigo'


export const PreSala = () => {

  const navigator = useNavigate()
  const [codigo, setCodigo] = useState(null);

 

  const handleOnClick = () => {
    console.log('Button clicked')
    navigator('/sala/1')
  }
  return (
    <div className='bg-[url(/img/bgStadium.png)] bg-cover bg-center h-svh pt-1 '>
      <div className='flex justify-center m-auto mt-40 w-1/2 shadow-lg bg-white shadow-black rounded-lg'>
        <div className='block mt-10 w-1/2 '>
          <p className='flex justify-center text-slate-500' >Máximo 7 jugadores</p>
          <div className='ml-10'>
            <UsuarioPresala />
            <UsuarioPresala />
            <UsuarioPresala />
            <UsuarioPresala />
            <UsuarioPresala />
            <UsuarioPresala />
            <UsuarioPresala />
          </div>
          <button onClick={handleOnClick} className='flex justify-center mt-5 p-2 m-auto w-44 rounded-lg text-white bg-slate-900 font-bold'>Iniciar</button>
          <p className='flex justify-center m-4 font-bold'>Codigo: {generarCodigoAleatorio(6)}</p>
        </div>
        <img className='w-1/2 rounded-e-lg' src="https://i.pinimg.com/originals/48/1b/dd/481bddb7c261ed9f35d3122d17a2cad2.jpg"  alt="" />
      </div>
    </div>
  )
}
