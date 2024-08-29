
import usuarioModel from "../models/usuario.js";
import { verified } from "../utils/bcrypt.handle.js";
import { generarToken } from "../utils/jwt.handle.js";

export const loginUsuario = async (req, res) => {
    try {
        const user = await usuarioModel.findOne( { correo: req.body.correo });
      if (!user) {
        return res.status(401).json({ msg: "Correo electrónico no registrado" });
      }
  
      const contrasenaHash = user.contraseña;
      const esCorrecto = await verified(req.body.contraseña, contrasenaHash);
  
      if (!esCorrecto) {
        return res.status(401).json( {msg: "Contraseña incorrecta"});
      }
  
      const token = generarToken(user.correo);
      return res.status(201).json({
        token:token,
        usuario:user,
        msg:"Inicio de sesion exitoso",
      });
    } catch (error) {
      console.log(error)
      console.error("Error en el inicio de sesion:", error.message);
    }
  };