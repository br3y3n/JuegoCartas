import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Login } from '../Components/Login';
import { Register } from '../Components/Register';

export const LoginRegister = () => {
    const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

    return (
        <motion.div 
        className={`relative flex ${isRegistering ? 'flex-row-reverse' : 'flex-row'} items-center justify-center h-screen`}
        animate={{ flexDirection: isRegistering ? 'row-reverse' : 'row' }}
        transition={{ duration: 0.6 }}
    >

        <div 
            className="absolute inset-0 bg-[url('/img/fondoLogin.png')] bg-cover filter blur-sm z-[-1]"
            aria-hidden="true"
        ></div>
    
    <motion.div 
                className={`relative w-1/2 flex justify-center ${isRegistering ? 'order-2' : 'order-1'}`}
                initial={{ opacity: 0, x: isRegistering ? 200 : -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRegistering ? -200 : 200 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <img src="/img/login.png" alt="Illustration" className="w-[400px] h-[550px] rounded-lg" />
            </motion.div>
    
        <AnimatePresence mode="wait">
            {isRegistering ? (
                <Register key="register" handleToggle={handleToggle} />
            ) : (
                <Login key="login" handleToggle={handleToggle} />
            )}
        </AnimatePresence>
    </motion.div>
    
      );
}

