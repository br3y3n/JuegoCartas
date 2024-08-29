
import jwt, { decode } from 'jsonwebtoken';
const { sign , verify} = jwt;



const JWT_SECRET = process.env.JWT_SECRET ||'jwtjuego'

console.log("JWT"+JWT_SECRET)
export const generarToken =(id)=>{
  
   const jwt = sign({id}, JWT_SECRET,{
    expiresIn: 1200
   } ) 

   return jwt
}


export const verificarToken=(jwt)=>{
    try {
        const jwtValidado = verify(jwt, JWT_SECRET)

        return jwtValidado
    } catch (error) {
          return error.message;
    }
}

export const decodeToken = (token) => {
    try {
        const jwt = decode(token)
        return jwt
    } catch (error) {
        return error.message
    }
}