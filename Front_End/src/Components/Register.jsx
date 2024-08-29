import React from 'react';
import { motion } from 'framer-motion';


export const Register = ({ handleToggle }) => {
    return (
        <motion.div 
          className="flex flex-col border shadow-md p-5 bg-white w-80 rounded-lg"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold text-center mb-2'>Registrarse</h2>
          <label className='font-bold text-xl mt-5 drop-shadow-md'>Usuario</label>
          <input type="text" placeholder="Correo electrónico" className='border p-2 rounded-sm border-violet-700 drop-shadow-md' />
          <label className='font-bold text-xl mt-5 drop-shadow-md'>Correo</label>
          <input type="email" placeholder="Correo electrónico" className='border p-2 rounded-sm border-violet-700 drop-shadow-md' />
          <label className='font-bold text-xl mt-5 drop-shadow-md'>Contraseña</label>
          <input type="password" placeholder="Contraseña" className='border p-2 rounded-sm border-violet-700 drop-shadow-md' />
          <label className='font-bold text-xl mt-5 drop-shadow-md'>Confirmar Contraseña</label>
          <input type="password" placeholder="Contraseña" className='border p-2 rounded-sm border-violet-700 drop-shadow-md' />
          <button className='bg-purple-950 mt-10 p-2 rounded-lg text-white font-semibold text-2xl'>Crear Cuenta</button>
          <label className='text-slate-700 font-medium mt-4 cursor-pointer' onClick={handleToggle}>Ya tienes cuenta?ir al login</label>
        </motion.div>
      );
}

