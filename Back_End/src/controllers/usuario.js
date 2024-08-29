
import usuarioModel from "../models/usuario.js";
import { encrypt } from "../utils/bcrypt.handle.js";
import { generarToken } from "../utils/jwt.handle.js";
export const createUsuario = async (req, res) => {

    try {
        const contraseñaHash =await encrypt(req.body.contraseña)
        const verificationToken = generarToken(req.body.correo);
      const response = await usuarioModel.create({
        correo: req.body.correo,
        contraseña: contraseñaHash,
        nombre: req.body.nombre,
        vereficacionCuenta: verificationToken
      });
     
      return res.status(201).json({ response,msg:'Usuario creado correctamente' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };


export  const getAllUsuarios = async (req, res) => {
  console.log(req.body)
    try {
      const usuarios = await usuarioModel.findOne({correo:req.body.correo});
      return res.status(200).json({ usuarios });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const getUsuarioById = async (req, res) => {
    try {
      const usuario = await usuarioModel.findOne({ correo: req.user.id });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(200).json({ usuario });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const user= await usuarioModel.findOneAndUpdate({ _id: id },req.body, {
        new: true,
      });
     
      return res.status(404).json({user, msg: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await Usuario.deleteOne({_id:id});
      return res.status(204).json({
        deletedRows,
        msg:"Usuario eliminado correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };





