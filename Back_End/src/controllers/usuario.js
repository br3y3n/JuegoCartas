import Usuario from "../model/usuario.js";
import { encrypt } from "../utils/bcrypt.handle.js";
import { generarToken } from "../utils/jwt.handle.js";
import nodemailer from 'nodemailer';
export const createUsuario = async (req, res) => {
    try {
        const contraseñaHash =await encrypt(req.body.contraseña)
        const verificationToken = generarToken(req.body.correo);
      const response = await Usuario.create({
        correo: req.body.correo,
        contraseña: contraseñaHash,
        nombre: req.body.nombre,
        vereficacionCuenta: verificationToken
      });
      console.log(process.env.EMAIL_PASSWORD)

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.correo,
        subject: 'Verificación de correo electrónico',
        text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          console.log(info)
            return res.status(500).json({ error: 'Error al enviar el correo de verificación' });
        }
        res.status(200).json({ message: 'Correo de verificación enviado' });
    });
      // return res.status(201).json({ response,msg:'Usuario creado correctamente' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };


export  const getAllUsuarios = async (req, res) => {
  console.log(req.body)
    try {
      const usuarios = await Usuario.findOne({ where: { correo: req.body.correo } });
      return res.status(200).json({ usuarios });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const getUsuarioById = async (req, res) => {
  console.log(req.user)
    try {
      const usuario = await Usuario.findOne({ where: { correo: req.user.id } });
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
      const user= await Usuario.update(
        req.body,
        { where: { id }, returning: true }
      );
      console.log()
      if (user[1]===1) {
        const updatedUser = await Usuario.findOne({ where: { id: id } });
      return res.status(200).json({ user: updatedUser });
      }
     
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await Usuario.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(204).json({
        msg:"Usuario eliminado correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };





