import { motion } from 'framer-motion';

export const Login = ({handleToggle}) => {
    return (
        <motion.div 
          className="flex flex-col border shadow-md p-5 bg-white rounded-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold text-center mb-2'>Iniciar sesion</h2>
          <h3 className='text-slate-600 mb-5'>Ingresa tus credenciales para ingresar</h3>
          <label className='font-bold text-xl mt-5 drop-shadow-md'>Usuario</label>
          <input type="email" placeholder="Correo electrónico" className='border p-2 rounded-sm border-violet-700 drop-shadow-md' />
          <label className='font-bold text-xl mt-5 drop-shadow-md'>Contraseña</label>
          <input type="password" placeholder="Contraseña" className='border p-2 rounded-sm border-violet-700 drop-shadow-md' />
          <button className='bg-purple-950 mt-10 p-2 rounded-lg text-white font-semibold text-2xl'>Iniciar sesion</button>
          <label className='text-slate-500 font-medium mt-4 text-xl cursor-pointer' onClick={handleToggle}>Registrarse</label>
        </motion.div>
      );
}

